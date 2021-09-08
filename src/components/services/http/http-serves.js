/* eslint-disable */
import axios from "axios";
import { toast } from "react-toastify";
import { Jwt, getJwt } from "../authService";

Jwt(getJwt());

axios.interceptors.response.use(null, (err) => {
  const expectedError =
    err.response && err.response.status >= 400 && err.response.status < 500;
  if (!expectedError) {
    console.log(err);
    toast.error("logging errors", err);
  } else {
    return Promise.reject(err);
  }
});
export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  patch: axios.patch,
};
