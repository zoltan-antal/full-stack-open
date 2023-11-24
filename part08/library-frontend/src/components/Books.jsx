import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { ALL_BOOKS, BOOKS_BY_GENRE } from '../queries';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [genres, setGenres] = useState(new Set());
  const [genreFilter, setGenreFilter] = useState(null);
  const [filteredBooks, setFilteredBooks] = useState([]);

  const allBooksResult = useQuery(ALL_BOOKS, {
    onCompleted: (data) => {
      setBooks(data.allBooks);
      const genres = new Set();
      data.allBooks.forEach((book) =>
        book.genres.forEach((genre) => genres.add(genre))
      );
      setGenres(genres);
    },
  });
  const filteredBooksResult = useQuery(BOOKS_BY_GENRE, {
    variables: { genre: genreFilter },
    skip: !genreFilter,
    fetchPolicy: 'no-cache',
    onCompleted: (data) => setFilteredBooks(data.allBooks),
  });

  useEffect(() => {
    if (!genreFilter) {
      setFilteredBooks(books);
    }
  }, [genreFilter, books]);

  if (allBooksResult.loading || filteredBooksResult.loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((book) => {
            return (
              <tr key={book.title}>
                <td>{book.title}</td>
                <td>{book.author.name}</td>
                <td>{book.published}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div style={{ display: 'flex', gap: '5px' }}>
        {Array.from(genres).map((genre) => (
          <button key={genre} onClick={() => setGenreFilter(genre)}>
            {genre}
          </button>
        ))}
        <button onClick={() => setGenreFilter(null)}>all genres</button>
      </div>
    </div>
  );
};

export default Books;
