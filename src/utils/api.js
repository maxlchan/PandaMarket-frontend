import axios from '../config/customizedAxios';
import { ROUTES } from '../constants';

export const fetchUserByGoogleAuth = async (auth) => {
  const { profileObj } = auth;
  const { email, name, imageUrl } = profileObj;
  const payload = { email, name, imageUrl };

  return axios.post(`${ROUTES.USERS}${ROUTES.LOGIN}`, payload);
};

export const fetchUserByToken = async () => {
  return axios.post(`${ROUTES.USERS}${ROUTES.LOGIN}${ROUTES.TOKEN}`);
};
