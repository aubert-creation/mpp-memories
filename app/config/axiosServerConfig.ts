import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

export const apiServer = axios.create({
  baseURL: process?.env?.API_URL ?? '',
});

export default apiServer;
