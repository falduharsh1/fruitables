import axios from "axios";
import { BASE_URL } from "./base";


export const axiosInstance = axios.create({
    baseURL: BASE_URL, 
    withCredentials:true
});

axiosInstance.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });