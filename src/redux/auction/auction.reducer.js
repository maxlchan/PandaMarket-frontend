import { createReducer, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../utils/api';
import { addMyAuction, addReservedAuction } from '../user/user.reducer';
import { ROUTES } from '../../constants';

export const fetchAuctions = createAsyncThunk(
  'auctions/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.getAuctions();
      const { auctionsInfo } = data;

      return auctionsInfo ? auctionsInfo : [];
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const createAuction = createAsyncThunk(
  'auctions/create',
  async (payload, { dispatch, getState, extra, rejectWithValue }) => {
    const { history } = extra;

    try {
      const { user } = getState();
      const userId = user.info._id;

      const { data } = await api.postAuction(payload, userId);
      const { auctionInfo } = data;
      const auctionId = auctionInfo._id;

      dispatch(addMyAuction(auctionId));

      alert('등록 성공!');
      history.push(`${ROUTES.AUCTIONS}/${auctionId}${ROUTES.BROADCAST}`);

      return auctionInfo;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response.data);
    }
  }
);

export const reserveAuction = createAsyncThunk(
  'auctions/reserve',
  async (auctionId, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await api.reserveAuction(auctionId);
      const { auctionsInfo } = data;

      dispatch(addReservedAuction(auctionId));

      alert('예약 완료!');

      return auctionsInfo;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response.data);
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
    error: action.payload.result,
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
    error: action.payload.result,
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
    error: action.payload.result,
  }),
});

export default auctionReducer;
