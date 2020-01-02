/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
import { Api } from './Api';
import { Cache } from '../Cache';

const baseURL = '/api';
const uriAuth = '/auth';
const uriAuthUser = '/auth/user';

export class ApiAuth extends Api {
  authLogin = async ({ username, password }) => {
    const auth = { username, password };
    let response;
    try {
      const httpResponse = await this.http.post(uriAuth, { auth });
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
      this.http = this.newHttp();
    }

    return response;
  };

  authUser = async () => {
    let user = null;
    if (this.token) {
      const params = {};
      user = await this._getCached(uriAuthUser, params);
    }
    return user;
  };

  authLogout = async () => {
    this.cache.clear();
    this.token = null;
    this.http = this.newHttp();

    return true;
  };
}

const config = { baseURL };
const cacheClient = new Cache();
const apiAuth = new ApiAuth(config, cacheClient);

export default apiAuth;
