import { createContext, useState,useEffect } from "react";

export const LoginContext = createContext({
  user: null,
  setUser: () => {},
});

const LoginProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const savedUser = localStorage.getItem("userContext");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);
  return (
    <LoginContext.Provider value={{ user, setUser }}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginProvider;
