import { createReducer, createAsyncThunk } from '@reduxjs/toolkit';
import { addMyAuction, addReservedAuction } from '../user/user.reducer';
import { alertSuccess, alertError } from '../../config/customizedSwal';
import * as api from '../../utils/api';
import { MESSAGE, ROUTES, TYPE } from '../../constants';

export const fetchAuctions = createAsyncThunk(
  'auctions/fetch',
  async (_, thunkAPI) => {
    try {
      const { data } = await api.getAuctions();
      const { auctionsInfo } = data;

      return auctionsInfo ? auctionsInfo : [];
    } catch (err) {
      alertError(MESSAGE.UNKNOWN_ERROR);
      throw new Error(err);
    }
  }
);

export const createAuction = createAsyncThunk(
  'auctions/create',
  async ({ type, payload }, { dispatch, getState, extra }) => {
    const { history } = extra;

    if (type === TYPE.START) payload.isStarted = true;

    try {
      const { user: { info } } = getState();
      const userId = info._id;

      const { data: { auctionInfo } } = await api.postAuction(payload, userId);
      const auctionId = auctionInfo._id;

      dispatch(addMyAuction(auctionId));

      if (type === TYPE.START) {
        await alertSuccess(MESSAGE.REGISTER_SUCCESS_BROADCAST);
        history.push(`${ROUTES.AUCTIONS}/${auctionId}${ROUTES.BROADCAST}`);
      }

      if (type === TYPE.REGISTER) {
        await alertSuccess(MESSAGE.REGISTER_SUCCESS);
        history.push(`${ROUTES.HOME}`);
      }

      return auctionInfo;
    } catch (err) {
      alertError(MESSAGE.UNKNOWN_ERROR);
      throw new Error(err);
    }
  }
);

export const reserveAuction = createAsyncThunk(
  'auctions/reserve',
  async (auctionId, { getState, dispatch, extra }) => {
    const { history } = extra;
    const { user, auctions } = getState();
    const { info, isLoggedIn } = user;
    const { myAuctions, reservedAuctions } = info;
    const isUsersAuction = myAuctions.includes(auctionId);
    const isAlreadyReserved = reservedAuctions.includes(auctionId);

    if (!isLoggedIn) {
      alertError(MESSAGE.NOT_LOGIN);
      history.push(ROUTES.LOGIN);
      return;
    }

    if (isUsersAuction) {
      alertError(MESSAGE.INVALID_RESERVATION);
      return auctions.data;
    }

    if (isAlreadyReserved) {
      alertError(MESSAGE.ALREADY_RESERVED);
      return auctions.data;
    }

    try {
      const { data } = await api.reserveAuction(auctionId);
      const { updatedAuctionsInfo } = data;

      dispatch(addReservedAuction(auctionId));
      await alertSuccess(MESSAGE.RESERVE_SUCCESS);

      return updatedAuctionsInfo;
    } catch (err) {
      alertError(MESSAGE.UNKNOWN_ERROR);
      throw new Error(err);
    }
  }
);

const initialState = {
  data: [],
  isLoading: false,
  error: null,
};

const auctionReducer = createReducer(initialState, {
  [fetchAuctions.pending]: (state, action) => ({
    ...state,
    isLoading: true,
    error: null,
  }),
  [fetchAuctions.fulfilled]: (state, action) => ({
    ...state,
    data: action.payload,
    isLoading: false,
    error: null,
  }),
  [fetchAuctions.rejected]: (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error.message,
  }),
  [createAuction.pending]: (state, action) => ({
    ...state,
    isLoading: true,
    error: null,
  }),
  [createAuction.fulfilled]: (state, action) => ({
    data: [...state.data, action.payload],
    isLoading: false,
    error: null,
  }),
  [createAuction.rejected]: (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error.message,
  }),
  [reserveAuction.pending]: (state, action) => ({
    ...state,
    isLoading: true,
    error: null,
  }),
  [reserveAuction.fulfilled]: (state, action) => ({
    data: action.payload,
    isLoading: false,
    error: null,
  }),
  [reserveAuction.rejected]: (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error.message,
  }),
});

export default auctionReducer;
