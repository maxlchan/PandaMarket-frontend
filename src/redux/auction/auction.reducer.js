import { createReducer, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../utils/api';
import { addMyAuction, addReservedAuction } from '../user/user.reducer';
import { ROUTES, TYPE } from '../../constants';

export const fetchAuctions = createAsyncThunk(
  'auctions/fetch',
  async (_, thunkAPI) => {
    try {
      const { data } = await api.getAuctions();
      const { auctionsInfo } = data;

      return auctionsInfo ? auctionsInfo : [];
    } catch (err) {
      return err;
    }
  }
);

export const createAuction = createAsyncThunk(
  'auctions/create',
  async ({ type, payload }, { dispatch, getState, extra }) => {
    const { history } = extra;

    if (type === TYPE.START) payload.isStarted = true;

    try {
      const { user } = getState();
      const userId = user.info._id;

      const { data } = await api.postAuction(payload, userId);
      const { auctionInfo } = data;
      const auctionId = auctionInfo._id;

      dispatch(addMyAuction(auctionId));

      if (type === TYPE.START) {
        alert('등록 성공! 바로 경매방으로 입장입니다');
        history.push(`${ROUTES.AUCTIONS}/${auctionId}${ROUTES.BROADCAST}`);
      }

      if (type === TYPE.REGISTER) {
        alert('등록 성공! 바로 경매방으로 입장입니다');
        history.push(`${ROUTES.HOME}`);
      }

      return auctionInfo;
    } catch (err) {
      return err;
    }
  }
);

export const reserveAuction = createAsyncThunk(
  'auctions/reserve',
  async (auctionId, { getState, dispatch }) => {
    const { user, auctions } = getState();
    const { myAuctions, reservedAuctions } = user.info;
    const isUsersAuction = myAuctions.includes(auctionId);
    const isAlreadyReserved = reservedAuctions.includes(auctionId);

    if (isUsersAuction) {
      alert('자신이 만든 경매는 예약할 수 없습니다.');
      return auctions.data;
    }

    if (isAlreadyReserved) {
      alert('이미 예약하신 경매입니다.');
      return auctions.data;
    }

    try {
      const { data } = await api.reserveAuction(auctionId);
      const { updatedAuctionsInfo } = data;

      dispatch(addReservedAuction(auctionId));
      alert('예약 완료!');

      return updatedAuctionsInfo;
    } catch (err) {
      return err;
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
