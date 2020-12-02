import { createAction, createReducer } from "@reduxjs/toolkit";

const setUserInfo = createAction("setUserInfo");
const initialState = {
  _id: '',
  email: '',
  username: '',
  phonenumber: '',
  myAuction: [],
  reservedAuction: []
}

export const user = createReducer(initialState, {
  [setUserInfo]: (state, action) => {
    return action.payload;
  },
});