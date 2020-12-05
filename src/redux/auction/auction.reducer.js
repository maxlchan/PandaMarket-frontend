import { createReducer, createAsyncThunk } from '@reduxjs/toolkit';
import { getAuctions, postAuction } from '../../utils/api';
import { addMyAuction } from '../user/user.reducer';
import { MESSAGE } from '../../constants';

export const fetchAuctions = createAsyncThunk(
  'auctions/fetch',
  async (payload, thunkAPI) => {
    const { data } = await getAuctions();
    // const { userInfo, token } = data;

    // return userInfo;
  }
);

export const createAuction = createAsyncThunk(
  'auctions/create',
  async (payload, { dispatch, getState }) => {
    const { user } = getState();
    const userId = user.info._id;

    const { data } = await postAuction(payload, userId);
    const { auctionInfo } = data;

    dispatch(addMyAuction(auctionInfo));

    return auctionInfo;
  }
);

const initialState = {
  data: [
    {
      title: '',
      itemName: '',
      category: '',
      picturesUrl: [],
      description: '',
      initPrice: 0,
      finalPrice: 0,
      startedDateTime: null,
      isStarted: false,
      isFinished: false,
      host: '',
      reservedUser: [],
    },
  ],
  isLoading: false,
  error: null,
};

const auctionReducer = createReducer(initialState, {
  [fetchAuctions.pending]: (state, action) => {
    return {
      ...state,
      isLoading: true,
      error: null,
    };
  },
  [fetchAuctions.fulfilled]: (state, action) => {
    return {
      ...state,
      data: action.payload,
      isLoading: false,
      error: null,
    };
  },
  [fetchAuctions.rejected]: (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: action.payload.message,
    };
  },
  [createAuction.pending]: (state, action) => {
    return {
      ...state,
      isLoading: true,
      error: null,
    };
  },
  [createAuction.fulfilled]: (state, action) => {
    return {
      data: [...state.data, action.payload],
      isLoading: false,
      error: null,
    };
  },
  [createAuction.rejected]: (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: MESSAGE.UNKNOWN_ERROR,
    };
  },
});

export default auctionReducer;
