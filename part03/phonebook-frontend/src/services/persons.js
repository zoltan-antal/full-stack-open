import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

function getAll() {
  const response = axios.get(baseUrl);
  return response.then((response) => response.data);
}

function create(newObject) {
  const response = axios.post(baseUrl, newObject);
  return response.then((response) => response.data);
}

function remove(id) {
  const response = axios.delete(`${baseUrl}/${id}`);
  return response;
}

function update(id, newObject) {
  const response = axios.put(`${baseUrl}/${id}`, newObject);
  return response.then((response) => response.data);
}

export default { getAll, create, remove, update };
