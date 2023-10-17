import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

function getAll() {
  const response = axios.get(baseUrl);
  return response.then((response) => response.data);
}

function create(newPerson) {
  const response = axios.post(baseUrl, newPerson);
  return response.then((response) => response.data);
}

function remove(id) {
  const response = axios.delete(`${baseUrl}/${id}`);
  return response;
}

export default { getAll, create, remove };
