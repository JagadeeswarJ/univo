import { createContext, useState } from "react";

export const LoginContext = createContext({
  user: null,
  setUser: () => {},
});

const LoginProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <LoginContext.Provider value={{ user, setUser }}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginProvider;
