import axios from "axios";
import { SERVER_URL } from "./constants";
import { useEffect } from "react";

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
    const data = response.data;
    // console.log(data);

    if (response.data.success === true) {
      localStorage.setItem("accessToken", data.access_token);
      localStorage.setItem("username", username);
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
    // console.log(response);

    return response;
  } catch (error) {
    console.error("Signup failed:", error);
  }
};

export const logout = async () => {
  try {
    const res = await api.post("/logout/");
    console.log(res);

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getUser = async (username) => {
  try {
    const token = localStorage.getItem("accessToken");
    let response;

    if (token) {
      response = await api.get(`/getUser/${username}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    const data = await response?.data;
    return data;
  } catch (error) {
    console.error("Failed to get user:", error);
    throw error;
  }
};

// rename to postWasteRequest
export const postRequest = async (items) => {
  try {
    const token = localStorage.getItem("accessToken");
    let response;

    if (token) {
      response = await api.post(`/wastes/`, items, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);

      return response;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getCollectionRequest = async (username) => {
  try {
    const token = localStorage.getItem("accessToken");
    let response;

    if (token) {
      response = await api.get(`/wastes/`, username, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getMyWasteRequests = async () => {
  try {
    const token = localStorage.getItem("accessToken");
    let response;

    if (token) {
      response = await api.get(`/my-wastes/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getUserByUsername = async (username) => {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      throw new Error("No access token found");
    }
    const response = await api.get(`/role/${username}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const userRole = response.data.role;
    // Save role to localStorage
    localStorage.setItem("userRole", userRole);

    return userRole;
  } catch (error) {
    console.error("Failed to get user:", error);
    throw error;
  }
};

export const getUserByRole = () => {
  const role = localStorage.getItem("userRole");
  return role;
};

export const pullRequests = async () => {
  try {
    const token = localStorage.getItem("accessToken");
    let response;

    if (token) {
      response = await api.get(`/wastes/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    }
  } catch (error) {
    console.log(error);
  }
};

export const acceptRequest = async (id) => {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    console.error("Authorization token is missing. Please log in.");
    throw new Error("Authorization token is missing.");
  }

  try {
    const response = await api.patch(
      `/tasks/accept/${id}/`, // URL
      {}, // Empty body
      {
        headers: {
          "Content-Type": "application/json",
          // "X-CSRFToken": csrfToken,
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Failed to accept the request:",
      error.response || error.message
    );
    throw error; // Rethrow error for higher-level handling
  }
};

export const rejectRequest = async (id) => {
  const token = localStorage.getItem("accessToken");
  try {
    const response = await api.patch(
      `/tasks/${id}/reject/`, // URL
      {}, // Empty body
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
