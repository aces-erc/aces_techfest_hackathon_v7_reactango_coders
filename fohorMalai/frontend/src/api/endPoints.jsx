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
    if (response.data.success === true) {
      localStorage.setItem("auth", response.data.success);
    }
    return response;
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
    return response;
  } catch (error) {
    console.error("Signup failed:", error);
  }
};

export const logout = async () => {
  try {
    const res = await api.post("/logout/");
    // console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
};
