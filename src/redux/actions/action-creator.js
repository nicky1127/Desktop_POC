/* eslint-disable import/prefer-default-export */
/* eslint-disable no-return-await */
import axios from 'axios';
import {
  GET_IVR_DATA,
  CLEAR_IVR_DATA,
  SET_CUSTOMER,
  GET_CUSTOMERS_BY_SEARCH,
  SET_BRANDSCHEME
} from '../constants/action-types';

// APIs actions
const config = { baseURL: '/api' };
const http = axios.create(config);

const uriIVR = '/IVR/Calls';
const uriCustomer = '/customer/Info';

export const getIVRList = (params = {}) => {
  return async dispatch => {
    return await http.get(uriIVR, { params }).then(response => {
      dispatch({ type: GET_IVR_DATA, payload: response ? response.data : [] });
    });
  };
};

export const clearIVR = () => ({ type: CLEAR_IVR_DATA });

export const setBrandScheme = payload => {
  const obj = { type: SET_BRANDSCHEME, payload };
  return obj;
};

export const getCustomerByAccount = (params = {}) => {
  return async dispatch => {
    return await http.get(`${uriCustomer}/Account&Sort`, { params }).then(response => {
      dispatch({ type: SET_CUSTOMER, payload: response ? response.data : {} });
    });
  };
};

export const getCustomersBySearch = (params = {}) => {
  return async dispatch => {
    return await http.get(`${uriCustomer}/find`, { params }).then(response => {
      dispatch({ type: GET_CUSTOMERS_BY_SEARCH, payload: response ? response.data : [] });
    });
  };
};
