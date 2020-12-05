import { combineReducers } from 'redux';
import userReducer from './user/user.reducer';
import auctionReducer from './auction/auction.reducer';

export default combineReducers({
  user: userReducer,
  auctions: auctionReducer,
});
