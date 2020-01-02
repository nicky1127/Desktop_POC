/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
import axios from 'axios';
import cache, { Cache } from '../Cache';

const baseURL = '/api';
const uriAuth = '/auth';
const uriAuthUser = '/auth/user';

export class Api {
  constructor(config = null, cacheClient = null) {
    this.config = config || this._defaultConfig();
    this.cache = cacheClient || cache;
    this.token = this.cache.getItem('token');
    this.http = this.newHttp();
  }

  _defaultConfig() {
    return {
      baseURL
    };
  }

  newHttp() {
    const http = this.http || axios.create(this.config);
    if (!this.token) {
      this.token = this.cache.getItem('token');
    }

    // add AUTH TOKEN HEADER
    if (this.token) {
      // alter defaults after instance has been created
      http.defaults.headers.common.Authorization = `Bearer ${this.token}`;
    } else {
      delete http.defaults.headers.common.Authorization;
    }
    return http;
  }

  async makeCacheId(url, params = {}) {
    const data = { url, params };
    return JSON.stringify(data);
  }

  async _get(url, params = {}) {
    try {
      const response = await this.http.get(url, { params });
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  async _getCached(url, params = {}, expiryMinutes = 60) {
    const id = await this.makeCacheId(url, params);
    let result = this.cache.getItem(id);

    if (result) {
      // ok
    } else {
      result = await this._get(url, params);
      this.cache.setItem(id, result, expiryMinutes);
    }
    return result;
  }

  async authLogin({ username, password }) {
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
  }

  async authUser() {
    let user = null;
    if (this.token) {
      const params = {};
      user = await this._getCached(uriAuthUser, params);
    }
    return user;
  }
}

const config = { baseURL };
const cacheClient = new Cache();
const api = new Api(config, cacheClient);

export default api;
