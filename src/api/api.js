import axios from 'axios';

const baseURL = '/api';
const uriAuth = '/auth';
const config = { baseURL };
const http = axios.create(config);

export class Api {
  async authLogin({ username, password }) {
    const auth = { username, password };
    let response;
    try {
      console.log('auth in api', auth);
      const httpResponse = await http.post(uriAuth, { auth });
      response = httpResponse.data;
    } catch (err) {
      console.log('err', err);
    }

    return response;
  }
}

const api = new Api();

export default api;
