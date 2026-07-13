import axios from "axios";

// الرابط بييجي من متغير بيئة، ولو مش موجود بيرجع للافتراضي المحلي
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// كل request بيتبعت، بنلزّق التوكن تلقائياً لو موجود
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// لو أي رد جالنا 401 (توكن منتهي/غلط)، نمسح البيانات ونرجّع المستخدم لصفحة الدخول
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
