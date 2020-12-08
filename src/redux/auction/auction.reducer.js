import { createReducer, createAsyncThunk } from '@reduxjs/toolkit';
import { getAuctions, postAuction } from '../../utils/api';
import { addMyAuction } from '../user/user.reducer';
import { ROUTES } from '../../constants';

export const fetchAuctions = createAsyncThunk(
  'auctions/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await getAuctions();
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

      const { data } = await postAuction(payload, userId);
      const { auctionInfo } = data;
      const auctionId = auctionInfo._id;

      dispatch(addMyAuction(auctionInfo));

      alert('등록 성공!');
      history.push(
        `${ROUTES.AUCTIONS}/${auctionId}${ROUTES.BROADCAST}`
      );

      return auctionInfo;
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
    error: action.payload,
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
    error: action.payload,
  }),
});

export default auctionReducer;
