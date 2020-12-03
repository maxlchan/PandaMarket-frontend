import { createReducer } from '@reduxjs/toolkit';
import { loginUser, logoutUser } from '../actions';

const initialState = {
  isLoggedIn: false,
  _id: '',
  email: '',
  username: '',
  phonenumber: '',
  myAuction: [],
  reservedAuction: [],
};

export const user = createReducer(initialState, {
  [loginUser]: (state, action) => {
    return { isLoggedIn: true, ...action.payload };
  },
  [logoutUser]: (state, action) => {
    return initialState;
  },
});
