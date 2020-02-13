/* eslint-disable import/prefer-default-export */
/* eslint-disable no-return-await */
import axios from 'axios';
import { GET_IVR_DATA } from '../constants/action-types';

// APIs actions
const config = { baseURL: '/api' };
const http = axios.create(config);

const uriIVR = '/IVR/Calls';

export const IVRList = (params = {}) => {
  return async dispatch => {
    return await http.get(uriIVR, params).then(response => {
      dispatch({ type: GET_IVR_DATA, payload: response ? response.data : [] });
    });
  };
};
