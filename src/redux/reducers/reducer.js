import { GET_IVR_DATA } from '../constants/action-types';

const initialState = {
  IVRNo: 1,
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
    return { ...state, IVRList: action.payload };
  }

  return state;
};

export default reducer;
