// src/http_call/HttpRequest.js
import axios from "axios";
import {HOST_URL_LOGIN, HOST_URL_REGISTER } from "../service_url/AppUrlConfig";

axios.defaults.withCredentials = true;


export function loginRequest(email, password) {
  return axios.post(HOST_URL_LOGIN, { email, password });
}
// Hàm register (nếu bạn cần)
export function registerRequest(payload) {
  return axios.post(HOST_URL_REGISTER, payload);
}
/*export function googleSignInRequest() {
  return axios.get(HOST_URL_GG_LOGIN);
}*/
