import { useState, useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { CREATE_BOOK, ALL_BOOKS } from '../queries';
import { updateCache } from '../App';

const NewBook = () => {
  const { token } = useOutletContext();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [published, setPublished] = useState('');
  const [genre, setGenre] = useState('');
  const [genres, setGenres] = useState([]);

  const [createBook] = useMutation(CREATE_BOOK, {
    update: (cache, response) => {
      updateCache(cache, { query: ALL_BOOKS }, response.data.addBook);
    },
  });

  useEffect(() => {
    if (!localStorage.getItem('libraryUserToken')) {
      navigate('/login');
    }
  }, [token, navigate]);

  const submit = async (event) => {
    event.preventDefault();

    await createBook({
      variables: { title, author, published: Number(published), genres },
      awaitRefetchQueries: true,
    });

    setTitle('');
    setPublished('');
    setAuthor('');
    setGenres([]);
    setGenre('');

    navigate('/books');
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre('');
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};

export default NewBook;
