import { GET_IVR_DATA } from '../constants/action-types';

const initialState = {
  IVRNo: 3,
  IVRList: [],
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
    return Object.assign({}, state, {
      IVRList: action.payload
    });
  }

  return state;
};

export default reducer;
