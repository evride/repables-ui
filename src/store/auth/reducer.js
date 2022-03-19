import * as AuthTypes from './types';

const initialState = {
  token: null,
  timestamp: 0,
  loading: false,
  loaded: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AuthTypes.LOGIN:
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    case AuthTypes.LOGIN_SUCCESS:
      return {
        token: action.payload.token,
        timestamp: new Date().getTime(),
        loading: false,
        loaded: true,
      };
    case AuthTypes.LOGOUT:
    case AuthTypes.LOGIN_ERROR:
      return initialState;
    default:
      return state;
  }
};

export default authReducer;
