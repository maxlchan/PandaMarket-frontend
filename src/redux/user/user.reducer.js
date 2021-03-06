import {
  createAction,
  createReducer,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import * as api from '../../utils/api';
import { MESSAGE, TYPE } from '../../constants';
import { alertError } from '../../config/customizedSwal';

export const logoutUser = createAction('users/logout');
export const addMyAuction = createAction('users/addMyAuction');
export const addReservedAuction = createAction('users/addReservedAuction');

export const fetchUser = createAsyncThunk(
  'users/fetch',
  async ({ type, payload }, { extra }) => {
    const { history } = extra;

    try {
      if (type === TYPE.GOOGLEAUTH) {
        const { data } = await api.getUserByGoogleAuth(payload);
        const { userInfo, token } = data;

        localStorage.setItem('token', token);
        history.goBack();

        return userInfo;
      }

      if (type === TYPE.TOKEN) {
        const { data } = await api.getUserByToken(payload);
        const { userInfo } = data;

        return userInfo;
      }
    } catch (err) {
      alertError(MESSAGE.UNKNOWN_ERROR);
      throw new Error(err);
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
  [fetchUser.pending]: (state, action) => ({
    ...state,
    isLoading: true,
    error: null,
  }),
  [fetchUser.fulfilled]: (state, action) => ({
    ...state,
    info: { ...state.info, ...action.payload },
    isLoading: false,
    isLoggedIn: true,
    error: null,
  }),
  [fetchUser.rejected]: (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error.message,
  }),
  [addMyAuction]: (state, action) => {
    state.info.myAuctions.push(action.payload);
  },
  [addReservedAuction]: (state, action) => {
    state.info.reservedAuctions.push(action.payload);
  },
  [logoutUser]: (state, action) => initialState,
});

export default userReducer;
