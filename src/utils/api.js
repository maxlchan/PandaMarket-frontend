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
    initalPrice,
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
  formData.append('initalPrice', initalPrice);
  formData.append('startedDateTime', startedDateTime);

  return axios.post(`${ROUTES.AUCTIONS}`, formData, config);
};

export const finishAuction = async (payload, auctionId) => {
  console.log(payload);
  return axios.put(`${ROUTES.AUCTIONS}/${auctionId}`, payload);
};
