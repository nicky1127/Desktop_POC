/* eslint-disable import/prefer-default-export */
/* eslint-disable no-return-await */
import axios from 'axios';
import {
  GET_IVR_DATA,
  CLEAR_IVR_DATA,
  GET_CUSTOMER_BY_ACCOUNT,
  GET_CUSTOMERS_BY_SEARCH,
  SET_BRANDSCHEME
} from '../constants/action-types';

import { transformCustomerRows } from '../../HelperFiles/CustomerHelpers';

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
      dispatch({ type: GET_CUSTOMER_BY_ACCOUNT, payload: response ? response.data : {} });
    });
  };
};

export const getCustomersBySearch = (params = {}) => {
  return async dispatch => {
    return await http.get(`${uriCustomer}/find`, { params }).then(response => {
      let customerRows;
      if (Array.isArray(response.data) && response.data.length > 0) {
        customerRows = transformCustomerRows(response.data);
      } else {
        customerRows = [];
      }
      dispatch({ type: GET_CUSTOMERS_BY_SEARCH, payload: customerRows });
    });
  };
};
