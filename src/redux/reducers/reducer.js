import {
  GET_IVR_DATA,
  CLEAR_IVR_DATA,
  SET_BRANDSCHEME,
  SET_CUSTOMER,
  GET_CUSTOMERS_BY_SEARCH,
  LOAD_CUSTOMER_FAILURE
} from '../constants/action-types';

const initialState = {
  // 0: lloyds, 1: unidetified, 2: MBNA, 3: Halifax
  IVRNo: 0,
  IVR: {},
  brandScheme: {},
  customer: {},
  customersBySearch: [],
  recordCreateLoading: false,
  recordDeleteLoading: false,
  error: ''
};

const reducer = (state = initialState, action) => {
  //   if (action.type === ADD_RECORD) {
  //     return Object.assign({}, state, {
  //       recordCreateLoading: true
  //     });
  //   }
  if (action.type === GET_IVR_DATA) {
    return { ...state, IVR: action.payload[state.IVRNo] };
  }

  if (action.type === CLEAR_IVR_DATA) {
    return { ...state, IVR: {} };
  }

  if (action.type === SET_BRANDSCHEME) {
    return { ...state, brandScheme: action.payload };
  }

  if (action.type === SET_CUSTOMER) {
    return { ...state, customer: action.payload };
  }

  if (action.type === LOAD_CUSTOMER_FAILURE) {
    return { ...state, error: action.payload };
  }

  if (action.type === GET_CUSTOMERS_BY_SEARCH) {
    return { ...state, customersBySearch: action.payload };
  }

  return state;
};

export default reducer;
