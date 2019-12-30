import axios from 'axios';
import cache, { Cache } from '../Cache';

const baseURL = '/api';
const uriAuth = '/auth';
const config = { baseURL };
const http = axios.create(config);

export class Api {
  constructor() {
    this.cache = cache;
    this.token = this.cache.getItem('token');
  }
  async authLogin({ username, password }) {
    const auth = { username, password };
    let response;
    try {
      const httpResponse = await http.post(uriAuth, { auth });
      if (httpResponse.data.error) {
        throw new Error(httpResponse.data.error);
      }
      response = httpResponse.data;
    } catch (err) {
      console.log('err', err);
      throw err;
    }

    const { access_token, expires_in } = response;
    const tokenExpiryInMins = expires_in / 60;

    if (access_token) {
      this.cache.setItem('token', access_token, tokenExpiryInMins);
      this.token = access_token;
    }

    return response;
  }
}

const api = new Api();

export default api;
