import http from "./http/http-serves";
import { apiEndPoint } from "./http/config.json";
import axios from "axios";
import * as jwtDecode from "jwt-decode";

const apiUsers = apiEndPoint + "/auth";

export function login(username, password) {
  return http.post(apiUsers, {
    email: username,
    password: password,
  });
}

export function getJwt() {
  return localStorage.getItem("token");
}
export function getCurrentUser() {
  try {
    return jwtDecode(localStorage.getItem("token"));
  } catch (err) {
    return null;
  }
}
export function setJwt(Jwt) {
  return localStorage.setItem("token", Jwt);
}

export function logout() {
  return localStorage.removeItem("token");
}

export function Jwt(Jwt) {
  axios.defaults.headers.common["x-auth-token"] = Jwt;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  login,
  getCurrentUser,
  getJwt,
  setJwt,
  logout,
  Jwt,
};
