const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { GraphQLError } = require('graphql');
const mongoose = require('mongoose');
require('dotenv').config();
const Author = require('./models/author');
const Book = require('./models/book');
const User = require('./models/user');
const jwt = require('jsonwebtoken');

const MONGODB_URI = process.env.MONGODB_URI;
console.log('connecting to', MONGODB_URI);
mongoose.set('strictQuery', false);
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message);
  });

const typeDefs = `
  type Book {
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    born: Int
    books: [Book!]!
    bookCount: Int!
    id: ID!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    addAuthor(
      name: String!
      born: Int
    ): Author
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`;

const resolvers = {
  Query: {
    bookCount: async () => Book.countDocuments(),
    authorCount: async () => Author.countDocuments(),
    allBooks: async (root, args) => {
      let authorId;
      if (args.author) {
        const author = await Author.findOne({ name: args.author });
        if (!author) {
          throw new GraphQLError('Author does not exist', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.author,
            },
          });
        }
        authorId = author._id;
      }

      if (args.author && !args.genre) {
        return Book.find({ author: authorId });
      }

      if (args.genre && !args.author) {
        return Book.find({ genres: { $in: [args.genre] } });
      }

      if (args.author && args.genre) {
        return Book.find({ author: authorId, genres: { $in: [args.genre] } });
      }

      return Book.find({});
    },
    allAuthors: async () => Author.find({}),
    me: (root, args, context) => context.currentUser,
  },

  Book: {
    author: async (root, args) => {
      const book = await Book.findById(root._id).populate('author');
      return book.author;
    },
  },

  Author: {
    books: async (root) => Book.find({ author: root._id }),
    bookCount: async (root) => Book.countDocuments({ author: root._id }),
  },

  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError('Unauthorized request - not logged in', {
          extensions: {
            code: 'UNAUTHORIZED',
          },
        });
      }

      const author = await Author.findOne({ name: args.author });
      if (!author) {
        throw new GraphQLError('Author does not exist', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.author,
          },
        });
      }
      const authorId = author._id;

      try {
        const book = new Book({ ...args, author: authorId });
        await book.save();
        return book.populate('author');
      } catch (error) {
        if (error.name === 'ValidationError') {
          throw new GraphQLError('Validation failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: Object.keys(error.errors),
              error: error.message,
            },
          });
        } else {
          throw new GraphQLError('Saving author failed', {
            extensions: {
              error: error.message,
            },
          });
        }
      }
    },

    addAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError('Unauthorized request - not logged in', {
          extensions: {
            code: 'UNAUTHORIZED',
          },
        });
      }

      try {
        const author = new Author({ ...args });
        await author.save();
        return author;
      } catch (error) {
        if (error.name === 'ValidationError') {
          throw new GraphQLError('Validation failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: Object.keys(error.errors),
              error: error.message,
            },
          });
        } else {
          throw new GraphQLError('Saving author failed', {
            extensions: {
              error: error.message,
            },
          });
        }
      }
    },

    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError('Unauthorized request - not logged in', {
          extensions: {
            code: 'UNAUTHORIZED',
          },
        });
      }

      const author = await Author.findOneAndUpdate(
        { name: args.name },
        { born: args.setBornTo },
        { new: true, runValidators: true, context: 'query' }
      );
      if (!author) {
        throw new GraphQLError('Author does not exist', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.author,
          },
        });
      }
      return author;
    },

    createUser: async (root, args) => {
      try {
        const user = new User({ ...args });
        await user.save();
        return user;
      } catch (error) {
        if (error.name === 'ValidationError') {
          throw new GraphQLError('Validation failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: Object.keys(error.errors),
              error: error.message,
            },
          });
        } else {
          throw new GraphQLError('Saving user failed', {
            extensions: {
              error: error.message,
            },
          });
        }
      }
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });
      if (!user || args.password !== 'password') {
        throw new GraphQLError('Wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.startsWith('Bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7),
        process.env.JWT_SECRET
      );
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
