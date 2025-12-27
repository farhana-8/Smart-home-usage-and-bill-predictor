import api from "./api";

export const login = (data) => {
  return api.post("/api/auth/login", data).then(res => res.data);
};

export const register = (data) => {
  return api.post("/api/auth/register", data).then(res => res.data);
};
