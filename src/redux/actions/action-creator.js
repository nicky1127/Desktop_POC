/* eslint-disable import/prefer-default-export */
/* eslint-disable no-return-await */
import axios from 'axios';
import { GET_IVR_DATA, CLEAR_IVR_DATA, SET_BRANDSCHEME } from '../constants/action-types';

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

export const clearIVR = () => ({ type: CLEAR_IVR_DATA });

export const setBrandScheme = payload => {
  const obj = { type: SET_BRANDSCHEME, payload };
  return obj;
};
