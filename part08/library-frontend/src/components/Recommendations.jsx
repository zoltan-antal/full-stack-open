import { useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { ME, BOOKS_BY_GENRE } from '../queries';

const Recommendations = () => {
  const { token } = useOutletContext();
  const navigate = useNavigate();

  const [genreFilter, setGenreFilter] = useState(null);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem('libraryUserToken')) {
      navigate('/login');
    }
  }, [token, navigate]);

  const meResult = useQuery(ME, {
    onCompleted: (data) => setGenreFilter(data.me.favoriteGenre),
  });
  const booksResult = useQuery(BOOKS_BY_GENRE, {
    variables: { genre: genreFilter },
    skip: !genreFilter,
    fetchPolicy: 'no-cache',
    onCompleted: (data) => setBooks(data.allBooks),
  });

  if (meResult.loading || booksResult.loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favorite genre <b>{genreFilter}</b>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommendations;
