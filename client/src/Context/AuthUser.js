import React, { useState, useMemo, useContext } from 'react';
import { useNavigate } from "react-router-dom";

export const AuthUserContext = React.createContext({});

export const AuthUserContextProvider = (props) => {
  const [authUser, setAuthUser] = useLocalStorage("user", null)
  const navigate = useNavigate();

  
  /**
   * Data is Object user contains username
   */
  const login = (data) => {
    setAuthUser(data);

    navigate("/home", { state: { user: data } });
  };


  const logout = () => {
    setAuthUser(null);
    const requestOptions = {
      method: 'GET',
      credentials: 'include',
    };
    let baseURL = process.env.REACT_APP_API_BASE_URL || 'localhost:8787';
    fetch("http://" + baseURL + "/logout", requestOptions)
    navigate("/", { replace: true });
  };

  const value = useMemo(
    () => ({
      authUser,
      login,
      logout
    }),
    [authUser]
  );
  return <AuthUserContext.Provider value={value}>
    {props.children}
  </AuthUserContext.Provider>

};

export const useAuth = () => {
  return useContext(AuthUserContext);
};


const useLocalStorage = (keyName, defaultValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = window.localStorage.getItem(keyName);
      if (value) {
        return JSON.parse(value);
      } else {
        window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (err) {
      return defaultValue;
    }
  });
  const setValue = (newValue) => {
    try {
      window.localStorage.setItem(keyName, JSON.stringify(newValue));
    } catch (err) {
      console.log(err)
    }
    setStoredValue(newValue);
  };
  return [storedValue, setValue];
};