import { createReducer } from '@reduxjs/toolkit';
import { createAction } from '@reduxjs/toolkit';

export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';

export const loginUser = createAction('LOGIN_USER');
export const logoutUser = createAction('LOGOUT_USER');

const initialState = {
  isLoggedIn: false,
  _id: '',
  email: '',
  username: '',
  phonenumber: '',
  myAuction: [],
  reservedAuction: [],
};

const userReducer = createReducer(initialState, {
  [loginUser]: (state, action) => {
    return { isLoggedIn: true, ...action.payload };
  },
  [logoutUser]: (state, action) => {
    return initialState;
  },
});

export default userReducer;
