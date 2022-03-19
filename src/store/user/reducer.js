import * as AuthTypes from '../auth/types';

const initialState = {
  id: -1,
  username: '',
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AuthTypes.LOGIN:
      return {
        ...state,
      };
    case AuthTypes.LOGIN_SUCCESS:
      const { id, username, email } = action.payload;
      return {
        ...state,
        id,
        username,
      };
    case AuthTypes.LOGOUT:
    case AuthTypes.LOGIN_ERROR:
      return initialState;
    default:
      return state;
  }
};

export default authReducer;
