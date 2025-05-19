// src/http_call/HttpRequest.js
import axios from "axios";
import {HOST_URL_LOGIN, HOST_URL_REGISTER, HOST_URL_TICKETS, HOST_URL_WALLET } from "../service_url/AppUrlConfig";

axios.defaults.withCredentials = true;

//Login
export function loginRequest(email, password) {
  return axios.post(HOST_URL_LOGIN, { email, password });
}
//Register
export function registerRequest(payload) {
  return axios.post(HOST_URL_REGISTER, payload);
}
//Get All Ticket
export function getAllTickets() {
  return axios.get(HOST_URL_TICKETS);
}
//Get ticket by id
export function getTicketById(id) {
  return axios.get(`${HOST_URL_TICKETS}/${id}`);
}
export function getWallet(userId) {
  return axios.get(`${HOST_URL_WALLET}/user/${userId}`);
}
/*export function googleSignInRequest() {
  return axios.get(HOST_URL_GG_LOGIN);
}*/
