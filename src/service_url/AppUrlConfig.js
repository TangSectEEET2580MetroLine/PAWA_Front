const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3000";

export const HOST_URL = API_BASE_URL;
export const HOST_URL_LOGIN    = `${API_BASE_URL}/api/auth/login`;
//export const HOST_URL_GG_LOGIN = `${API_BASE_URL}/login/oauth2/code/google`;
export const HOST_URL_GG_LOGIN = `${API_BASE_URL}/oauth2/authorization/google`;
export const HOST_URL_REGISTER = `${API_BASE_URL}/api/auth/register`;

