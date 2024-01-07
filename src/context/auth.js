import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    authToken: "",
  });
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parseData = JSON.parse(userData);
      setAuth({
        ...auth,
        user: parseData.user,
        authToken: parseData.authToken,
      });
    }
    // eslint-disable-next-line
  }, []);
  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => {
  return useContext(AuthContext);
};
