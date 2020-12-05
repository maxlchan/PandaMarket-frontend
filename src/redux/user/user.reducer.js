import {
  createAction,
  createReducer,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import { getUserByGoogleAuth, getUserByToken } from '../../utils/api';
import { MESSAGE } from '../../constants';

export const logoutUser = createAction('users/logout');
export const addMyAuction = createAction('users/addMyAuction');

export const fetchUser = createAsyncThunk(
  'users/fetch',
  async ({ type, payload }, thunkAPI) => {
    if (type === 'googleAuth') {
      const { data } = await getUserByGoogleAuth(payload);
      const { userInfo, token } = data;

      localStorage.setItem('token', token);

      return userInfo;
    }

    if (type === 'token') {
      const { data } = await getUserByToken(payload);
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
    myAuctions: [],
    reservedAuctions: [],
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
      error: null,
    };
  },
  [fetchUser.fulfilled]: (state, action) => {
    return {
      ...state,
      info: { ...state.info, ...action.payload },
      isLoading: false,
      isLoggedIn: true,
      error: null,
    };
  },
  [fetchUser.rejected]: (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: MESSAGE.UNKNOWN_ERROR,
    };
  },
  [addMyAuction]: (state, action) => {
    return {
      ...state,
      info: {
        ...state.info,
        myAuctions: [...state.info.myAuction, action.payload],
      },
    };
  },
  [logoutUser]: (state, action) => {
    return initialState;
  },
});

export default userReducer;
