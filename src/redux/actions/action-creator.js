/* eslint-disable import/prefer-default-export */
/* eslint-disable no-return-await */
import axios from 'axios';
import {
  GET_IVR_DATA,
  CLEAR_IVR_DATA,
  SET_CUSTOMER,
  GET_CUSTOMERS_BY_SEARCH,
  SET_BRANDSCHEME,
  LOAD_CUSTOMER_FAILURE
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

export const setCustomer = payload => {
  const obj = { type: SET_CUSTOMER, payload };
  return obj;
};

export const getCustomerByAccount = (params = {}) => {
  return async dispatch => {
    return await http
      .get(`${uriCustomer}/Account&Sort`, { params })
      .then(response => {
        let payload;
        if (response) {
          payload = response.data;
        } else {
          payload = {};
        }
        dispatch(setCustomer(payload));
      })
      .catch(err => dispatch(loadCustomerFailure(err)));
  };
};

export const loadCustomerFailure = err => {
  const obj = { type: LOAD_CUSTOMER_FAILURE, payload: err.response.data.error };
  return obj;
};

export const getCustomersBySearch = (params = {}) => {
  return async dispatch => {
    return await http.get(`${uriCustomer}/find`, { params }).then(response => {
      dispatch({ type: GET_CUSTOMERS_BY_SEARCH, payload: response ? response.data : [] });
    });
  };
};
