"use client";

import axios from "axios";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const baseURL = "http://localhost:3100/api";

const createAxiosInstance = (config = {}) =>
  axios.create({
    baseURL,
    timeout: 15000,
    ...config,
  });

export const axiosPublic = createAxiosInstance();
export const axiosPrivate = createAxiosInstance();

// 🔒 Intercept requests to attach NextAuth session token
axiosPrivate.interceptors.request.use(
  async (config) => {
    const session = await getSession();

    console.log(session);
    // Get token from NextAuth
    if (session?.apiToken) {
      config.headers.Authorization = `Bearer ${session.apiToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 🚨 Intercept responses to handle 401 Unauthorized errors
axiosPrivate.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Remove session token (force logout)
      const router = useRouter();
      router.push("/auth/login"); // Next.js navigation instead of window.location

      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);
