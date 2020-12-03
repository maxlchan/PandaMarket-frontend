import axios from '../config/customizedAxios';
import { ROUTES } from '../constants';

export const loginWithGoogle = async (authResponse) => {
  const { profileObj } = authResponse;
  const { email, name, imageUrl } = profileObj;
  const payload = { email, name, imageUrl };

  return axios.post(`${ROUTES.USERS}${ROUTES.LOGIN}`, payload);
};

export const loginWithToken = async (token) => {
  return axios.post(`${ROUTES.USERS}${ROUTES.LOGIN}${ROUTES.TOKEN}`);
};