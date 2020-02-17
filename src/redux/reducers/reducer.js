import {
  GET_IVR_DATA,
  CLEAR_IVR_DATA,
  GET_CUSTOMER_BY_ACCOUNT,
  GET_CUSTOMERS_BY_SEARCH,
  SET_BRANDSCHEME
} from '../constants/action-types';

const initialState = {
  IVRNo: 1,
  IVR: {},
  brandScheme: {},
  customer: {},
  customersBySearch: [],
  recordCreateLoading: false,
  recordDeleteLoading: false
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

  if (action.type === GET_CUSTOMER_BY_ACCOUNT) {
    return { ...state, customer: action.payload };
  }

  if (action.type === GET_CUSTOMERS_BY_SEARCH) {
    return { ...state, customersBySearch: action.payload };
  }

  return state;
};

export default reducer;
