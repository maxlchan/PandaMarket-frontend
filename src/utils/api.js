import axios from '../config/customizedAxios';
import { ROUTES } from '../constants';

export const getUserByGoogleAuth = async (auth) => {
  const { profileObj } = auth;
  const { email, name, imageUrl } = profileObj;
  const payload = { email, name, imageUrl };

  return axios.post(`${ROUTES.USERS}${ROUTES.LOGIN}`, payload);
};

export const getUserByToken = async () => {
  return axios.post(`${ROUTES.USERS}${ROUTES.LOGIN}${ROUTES.TOKEN}`);
};

export const getAuctions = async () => {
  return axios.get(`${ROUTES.AUCTIONS}`);
};

export const postAuction = async (payload, userId) => {
  const {
    title,
    itemName,
    category,
    pictures,
    description,
    initialPrice,
    startedDateTime,
  } = payload;

  const formData = new FormData();
  const config = { headers: { 'content-type': 'multipart/form-data' } };

  pictures.forEach((file, index) => {
    const fileName = userId + Date.now() + index;
    formData.append('image', file, fileName);
  });

  formData.append('title', title);
  formData.append('itemName', itemName);
  formData.append('category', category);
  formData.append('description', description);
  formData.append('initialPrice', initialPrice);
  formData.append('startedDateTime', startedDateTime);

  return axios.post(`${ROUTES.AUCTIONS}`, formData, config);
};

export const startAuction = async (auctionId) => {
  return axios.put(`${ROUTES.AUCTIONS}/${auctionId}${ROUTES.START}`);
};

export const finishAuction = async (payload, auctionId) => {
  return axios.put(`${ROUTES.AUCTIONS}/${auctionId}${ROUTES.FINISH}`, payload);
};

export const reserveAuction = async (auctionId) => {
  return axios.put(`${ROUTES.AUCTIONS}/${auctionId}${ROUTES.RESERVE}`);
};
