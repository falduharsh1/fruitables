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

  axiosInstance.interceptors.response.use(function (response) {
   
    return response;
  }, async function  (error) {
    try {
      console.log("successfull generate new token");
      
      if(error.response && error.response.status === 401){
        await axios.get(BASE_URL + 'user/generate-new-token' , {withCredentials : true})

        return axiosInstance(error.config)
    }
    } catch (error) {
      console.log("error in generating new token" , error);
    }
    return Promise.reject(error);
  });