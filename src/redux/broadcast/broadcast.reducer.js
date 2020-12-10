import {
  createAction,
  createReducer,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import { finishAuction } from '../../utils/api';

export const setBroadcast = createAction('broadcast/set');
export const resetBroadcast = createAction('broadcast/reset');
export const startCountdown = createAction('broadcast/startCountdown');

export const setBroadcastEnd = createAsyncThunk(
  'broadcast/setEnd',
  async (auctionId, { getState, rejectWithValue }) => {
    try {
      const { broadcast } = getState();
      const winner = broadcast.winnerList.slice(-1)[0];
      const finalPrice = broadcast.highestBidPriceList.slice(-1)[0];
      const payload = { winner: winner._id, finalPrice };

      await finishAuction(payload, auctionId);

      return;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getMedia = createAsyncThunk(
  'broadcast/getMedia',
  async (payload, { rejectWithValue }) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });

      payload.scrObject = stream;
    } catch (err) {
      return rejectWithValue(err);
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
  isEnd: false,
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
    error: action.payload.result,
  }),
  [setBroadcast]: (state, action) => ({
    ...state,
    ...action.payload,
  }),
  [startCountdown]: (state, action) => ({
    ...state,
    isCountdownStart: true,
  }),
  [setBroadcastEnd.pending]: (state, action) => ({
    ...state,
    isLoading: true,
    error: null,
  }),
  [setBroadcastEnd.fulfilled]: (state, action) => ({
    ...state,
    isEnd: true,
    isLoading: false,
    error: null,
  }),
  [setBroadcastEnd.rejected]: (state, action) => ({
    ...state,
    isLoading: false,
    error: action.payload.result,
  }),
  [resetBroadcast]: (state, action) => initialState,
});

export default broadcastReducer;
