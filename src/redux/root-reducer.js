import { combineReducers } from 'redux';
import userReducer from './user/user.reducer';
import auctionReducer from './auction/auction.reducer';
import broadcastReducer from './broadcast/broadcast.reducer';

export default combineReducers({
  user: userReducer,
  auctions: auctionReducer,
  broadcast: broadcastReducer,
});
