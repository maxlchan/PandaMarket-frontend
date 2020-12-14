import {
  createAction,
  createReducer,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import { finishAuction, startAuction } from '../../utils/api';

export const setBroadcast = createAction('broadcast/set');
export const resetBroadcast = createAction('broadcast/reset');

export const startBroadcast = createAsyncThunk(
  'broadcast/start',
  async (auctionId, thunkAPI) => {
    try {
      await startAuction(auctionId);
      return;
    } catch (err) {
      throw new Error(err);
    }
  }
);

export const finishBroadcast = createAsyncThunk(
  'broadcast/finish',
  async (auctionId, { getState }) => {
    try {
      const { broadcast } = getState();
      const winner = broadcast.winnerList.slice(-1)[0];
      const finalPrice = broadcast.highestBidPriceList.slice(-1)[0];
      const payload = { winner: winner._id, finalPrice };

      await finishAuction(payload, auctionId);
      return;
    } catch (err) {
      throw new Error(err);
    }
  }
);

const initialState = {
  host: '',
  members: [],
  messages: [],
  privateMessages: [],
  winnerList: [],
  highestBidPriceList: [],
  isCountdownStart: false,
  timeCount: null,
  isFinished: false,
  isLoading: false,
  error: null,
};

const broadcastReducer = createReducer(initialState, {
  [setBroadcast]: (state, action) => ({
    ...state,
    ...action.payload,
  }),
  [resetBroadcast]: (state, action) => initialState,
  [startBroadcast.pending]: (state, action) => ({
    ...state,
    isLoading: true,
    error: null,
  }),
  [startBroadcast.fulfilled]: (state, action) => ({
    ...state,
    isLoading: false,
    error: null,
  }),
  [startBroadcast.rejected]: (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error.message,
  }),
  [finishBroadcast.pending]: (state, action) => ({
    ...state,
    isLoading: true,
    error: null,
  }),
  [finishBroadcast.fulfilled]: (state, action) => ({
    ...state,
    isFinished: true,
    isLoading: false,
    error: null,
  }),
  [finishBroadcast.rejected]: (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error.message,
  }),
});

export default broadcastReducer;
