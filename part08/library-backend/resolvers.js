const { PubSub } = require('graphql-subscriptions');
const jwt = require('jsonwebtoken');
const Author = require('./models/author');
const Book = require('./models/book');
const User = require('./models/user');

const pubsub = new PubSub();

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
  },

  Book: {
    author: async (root, args) => {
      const book = await Book.findById(root._id).populate('author');
      return book.author;
    },
  },

  Author: {
    books: async (root) => Book.find({ author: root._id }),
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
        await Author.updateOne(
          { name: author.name },
          { bookCount: author.bookCount + 1 }
        );
        pubsub.publish('BOOK_ADDED', { bookAdded: book });
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

  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED'),
    },
  },
};

module.exports = resolvers;
