import axios from 'axios';
import { DiaryEntry } from '../types';

const baseUrl = 'http://localhost:3000/api/diaries';

export const getAllEntries = async () => {
  const response = await axios.get<DiaryEntry[]>(baseUrl);
  console.log(response);
  return response.data;
};
