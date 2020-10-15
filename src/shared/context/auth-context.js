import { createContext } from "react";

export const AuthContext = createContext({
  name: null,
  isLoggedIn: false,
  userId: null,
  token: null,
  login: () => {},
  logout: () => {},
});
