import axios from "axios";
import { SERVER_URL } from "./constants";

const BASE_URL = SERVER_URL;

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original_request = error.config;
    if (error.response?.status === 401 && !original_request._retry) {
      original_request._retry = true;
      try {
        await refresh_token();
        return api(original_request);
      } catch (refreshError) {
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export const login_token = async (username, password) => {
  try {
    const response = await api.post("/login/", { username, password });
    console.log(response.data);
    // const { access_token } = response.data;
    // console.log(access_token);
    // localStorage.setItem("access_token", access_token);
    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

// signup success
export const signup_token = async (username, email, password, role, phone) => {
  try {
    const response = await api.post("/register/", {
      username,
      email,
      password,
      role,
      phone,
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Signup failed:", error);
  }
};
