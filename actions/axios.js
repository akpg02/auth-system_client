import axios from "axios";
import { getCurrentUser } from "../utils/firebase/firebase.utils";

export const axiosPublic = axios.create({
  baseURL: process.env.REACT_APP_API,
});

export const axiosAuth = axios.create({ baseURL: process.env.REACT_APP_API });

axiosAuth.interceptors.request.use(
  async (config) => {
    const user = await getCurrentUser();
    config.headers.token = user ? await user.getIdToken(true) : "";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
