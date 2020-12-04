import {
  createAction,
  createReducer,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import { fetchUserByGoogleAuth, fetchUserByToken } from '../../utils/api';

export const logoutUser = createAction('LOGOUT_USER');

export const fetchUser = createAsyncThunk(
  'users/fetch',
  async ({ type, payload }, thunkAPI) => {
    if (type === 'googleAuth') {
      const { data } = await fetchUserByGoogleAuth(payload);
      const { userInfo, token } = data;

      localStorage.setItem('token', token);

      return userInfo;
    }

    if (type === 'token') {
      const { data } = await fetchUserByToken(payload);
      const { userInfo } = data;

      return userInfo;
    }
  }
);

const initialState = {
  info: {
    _id: '',
    email: '',
    username: '',
    phonenumber: '',
    myAuction: [],
    reservedAuction: [],
  },
  isLoggedIn: false,
  isLoading: false,
  error: null,
};

const userReducer = createReducer(initialState, {
  [fetchUser.pending]: (state, action) => {
    return {
      ...state,
      isLoading: true,
    };
  },
  [fetchUser.fulfilled]: (state, action) => {
    return {
      ...state,
      info: action.payload,
      isLoading: false,
      isLoggedIn: true,
    };
  },
  [fetchUser.rejected]: (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: action.payload.message,
    };
  },
  [logoutUser]: (state, action) => {
    return initialState;
  },
});

export default userReducer;
