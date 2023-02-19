import { useEffect } from "react";
import { createContext, useContext, useState } from "react";

const initialState = {
  user: null,
  setToken: () => {},
};

export const AuthContext = createContext(initialState);
const TOKEN_KEY = "Session Token DO-NOT-SHARE";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      setToken(token);
    }
  }, []);

  useEffect(() => {
    fetchUser(token);
  }, [token]);

  const fetchUser = async (token) => {
    if (!token) {
      localStorage.removeItem(TOKEN_KEY);
      setUser(null);
      return;
    }

    const response = await fetch("/api/account/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (data.success === true) {
      localStorage.setItem(TOKEN_KEY, token);
      setUser(data.user);
      return;
    } else {
      localStorage.removeItem(TOKEN_KEY);
      setUser(null);
      alert("Your Session has expired. Please log in again.");
      return;
    }
  };

  return (
    <AuthContext.Provider value={{ user, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
