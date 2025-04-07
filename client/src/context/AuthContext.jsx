// import { createContext, useState } from "react";

// export const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//     const [isAuthenticated, setIsAuthenticated] = useState(() => {
//       return localStorage.getItem('isReallyAdmin') === 'true'
//     });
  
//     const setAuth = (value) => {
//       setIsAuthenticated(value);
//       localStorage.setItem('isReallyAdmin', value);
//     };
  
//     return (
//       <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated: setAuth }}>
//         {children}
//       </AuthContext.Provider>
//     );
//   };
  