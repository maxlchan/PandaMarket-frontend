import {
  createAction,
  createReducer,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import { finishAuction, startAuction } from '../../utils/api';

export const setBroadcast = createAction('broadcast/set');
export const resetBroadcast = createAction('broadcast/reset');
export const startCountdown = createAction('broadcast/startCountdown');

export const startBroadcast = createAsyncThunk(
  'broadcast/start',
  async (auctionId, thunkAPI) => {
    try {
      await startAuction(auctionId);
      return;
    } catch (err) {
      return err;
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
      return err;
    }
  }
);

export const getMedia = createAsyncThunk(
  'broadcast/getMedia',
  async (payload, thunkAPI) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });

      payload.scrObject = stream;
    } catch (err) {
      return err;
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
  [getMedia.pending]: (state, action) => ({
    ...state,
    isLoading: true,
    error: null,
  }),
  [getMedia.fulfilled]: (state, action) => ({
    ...state,
    isLoading: false,
    error: null,
  }),
  [getMedia.rejected]: (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error.message,
  }),
  [setBroadcast]: (state, action) => ({
    ...state,
    ...action.payload,
  }),
  [startCountdown]: (state, action) => ({
    ...state,
    isCountdownStart: true,
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
  [resetBroadcast]: (state, action) => initialState,
});

export default broadcastReducer;
