import { useState, useCallback, useEffect } from "react";

let logoutTimer;
export const useAuth = () => {
  const [token, setToken] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [userId, setUserId] = useState(false);
  const [name, setName] = useState();
  const login = useCallback((name, uid, token, expirationDate) => {
    setToken(token);
    setUserId(uid);
    setName(name);
    const tokenExp =
      // 1 hour timer on token
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExp);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        name: name,
        userId: uid,
        token: token,
        expiration: tokenExp.toISOString(),
      })
    );
  }, []);
  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    setUserId(null);
    setName(null);
    localStorage.removeItem("userData");
  }, []);
  //token exp
  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);
  //auto-login with local stored token
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.name,
        storedData.userId,
        storedData.token,
        new Date(storedData.expiration)
      );
    }
  }, [login]);
  return { token, login, logout, userId, name };
};
