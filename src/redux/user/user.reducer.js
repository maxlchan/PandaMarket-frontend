import {
  createAction,
  createReducer,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import { getUserByGoogleAuth, getUserByToken } from '../../utils/api';

export const logoutUser = createAction('users/logout');
export const addMyAuction = createAction('users/addMyAuction');

export const fetchUser = createAsyncThunk(
  'users/fetch',
  async ({ type, payload }, { extra, rejectWithValue }) => {
    const { history } = extra;

    try {
      if (type === 'googleAuth') {
        const { data } = await getUserByGoogleAuth(payload);
        const { userInfo, token } = data;

        localStorage.setItem('token', token);
        history.goBack();

        return userInfo;
      }

      if (type === 'token') {
        const { data } = await getUserByToken(payload);
        const { userInfo } = data;

        return userInfo;
      }
    } catch (err) {
      return rejectWithValue(err.response.data);
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
    error: action.payload,
  }),
  [addMyAuction]: (state, action) => {
    state.info.myAuctions.push(action.payload);
  },
  [logoutUser]: (state, action) => initialState,
});

export default userReducer;
