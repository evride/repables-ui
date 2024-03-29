import * as AuthTypes from './types';

const initialState = {
  id: -1,
  token: null,
  timestamp: 0,
  username: '',
  loading: false,
  loaded: false,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case AuthTypes.LOGIN:
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    case AuthTypes.LOGIN_SUCCESS:
      const {id, username, token} = action.payload
      return {
        id, 
        token,
        timestamp: new Date().getTime(),
        username,
        loading: false,
        loaded: true
      };
    case AuthTypes.LOGOUT:
    case AuthTypes.LOGIN_ERROR:
      return initialState;
    default:
      if(state){
        return state;
      }  
      return initialState;
  }
};

export default authReducer;
