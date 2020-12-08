import {
  createReducer,
  createAsyncThunk,
} from '@reduxjs/toolkit';

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
  chatList: [],
  currentWinner: '',
  currentHighesstPrice: '',
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
});

export default broadcastReducer;
