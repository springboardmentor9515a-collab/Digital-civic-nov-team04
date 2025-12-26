// // import React, { createContext, useState, useEffect } from 'react';
// // import authService from '../services/authService';

// // const AuthContext = createContext(null);

// // export const AuthProvider = ({ children }) => {
// //   // Initialize user as null (not logged in)
// //   const [user, setUser] = useState(null);
// //   const [loading, setLoading] = useState(true);

// //   // Check authentication status on component mount
// //   useEffect(() => {
// //     checkAuth();
// //   }, []);

// //   const checkAuth = async () => {
// //     try {
// //       const token = localStorage.getItem('token');
// //       if (token) {
// //         // Verify token with backend
// //         const userData = await authService.getCurrentUser();
// //         setUser(userData.user);
// //         // Sync local storage
// //         try { localStorage.setItem('user', JSON.stringify(userData.user)); } catch {}
// //       } else {
// //         // Optional: Check for stored user if no token check is desired, 
// //         // but usually we want to verify the token.
// //         const stored = localStorage.getItem('user');
// //         if (stored) setUser(JSON.parse(stored));
// //       }
// //     } catch (error) {
// //       console.error('Auth check failed:', error);
// //       // Clear invalid session data
// //       localStorage.removeItem('token');
// //       localStorage.removeItem('user');
// //       setUser(null);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const login = async (email, password) => {
// //     const response = await authService.login(email, password);
// //     setUser(response.user);
// //     try { localStorage.setItem('user', JSON.stringify(response.user)); } catch {}
// //     return response;
// //   };

// //   const logout = async () => {
// //     try {
// //       await authService.logout();
// //     } catch (error) {
// //       console.error("Logout error:", error);
// //     }
// //     setUser(null);
// //     localStorage.removeItem('token');
// //     localStorage.removeItem('user');
// //   };

// //   const updateUser = (newUser) => {
// //     setUser(newUser);
// //     try { localStorage.setItem('user', JSON.stringify(newUser)); } catch {}
// //     try {
// //       const ev = new CustomEvent('profileUpdated', { detail: newUser });
// //       window.dispatchEvent(ev);
// //     } catch {}
// //   };

// //   const value = {
// //     user,
// //     loading,
// //     login,
// //     logout,
// //     checkAuth,
// //     updateUser,
// //   };

// //   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// // };

// // export default AuthContext;

// import React, { createContext, useState, useEffect } from 'react';
// import authService from '../services/authService';

// const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//   // BYPASS: Initialize with a fake user immediately so the app thinks we are logged in
//   const [user, setUser] = useState({
//     _id: "test-user-id",
//     name: "Test Citizen",
//     email: "test@example.com",
//     role: "citizen", // Change to "official" to test official features
//     verified: true
//   });
  
//   // Set loading to false immediately so we don't wait for backend
//   const [loading, setLoading] = useState(false);

//   // We don't need to check the backend for bypass mode
//   const checkAuth = async () => {
//     setLoading(false);
//   };

//   const login = async (email, password) => {
//     // Mock login function
//     const mockUser = {
//       _id: "test-user-id",
//       name: "Test Citizen",
//       email: email,
//       role: "citizen",
//       verified: true
//     };
//     setUser(mockUser);
//     return { success: true, user: mockUser };
//   };

//   const logout = async () => {
//     // Mock logout - just redirect to home
//     window.location.href = '/'; 
//   };

//   const updateUser = (newUser) => {
//     setUser(newUser);
//   };

//   const value = {
//     user,
//     loading,
//     login,
//     logout,
//     checkAuth,
//     updateUser,
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

// import React, { createContext, useState, useEffect } from 'react';
// import authService from '../services/authService';

// const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//   // BYPASS: Initialize with a fake user immediately so the app thinks we are logged in
//   const [user, setUser] = useState({
//     _id: "test-user-id",
//     name: "Test Citizen",
//     email: "test@example.com",
//     role: "citizen", // Change to "official" to test official features
//     verified: true
//   });
  
//   // Set loading to false immediately so we don't wait for backend
//   const [loading, setLoading] = useState(false);

//   // We don't need to check the backend for bypass mode
//   const checkAuth = async () => {
//     setLoading(false);
//   };

//   const login = async (email, password) => {
//     // Mock login function
//     const mockUser = {
//       _id: "test-user-id",
//       name: "Test Citizen",
//       email: email,
//       role: "citizen",
//       verified: true
//     };
//     setUser(mockUser);
//     return { success: true, user: mockUser };
//   };

//   const logout = async () => {
//     // Mock logout - just redirect to home
//     window.location.href = '/'; 
//   };

//   const updateUser = (newUser) => {
//     setUser(newUser);
//   };

//   const value = {
//     user,
//     loading,
//     login,
//     logout,
//     checkAuth,
//     updateUser,
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

// export default AuthContext;

import React, { createContext, useState, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // BYPASS: Initialize with a fake user immediately so the app thinks we are logged in
  const [user, setUser] = useState({
    _id: "test-user-id",
    name: "Test Citizen",
    email: "test@example.com",
    role: "citizen", // Change to "official" to test official features
    verified: true
  });
  
  // Set loading to false immediately so we don't wait for backend
  const [loading, setLoading] = useState(false);

  // We don't need to check the backend for bypass mode
  const checkAuth = async () => {
    setLoading(false);
  };

  const login = async (email, password) => {
    // Mock login function
    const mockUser = {
      _id: "test-user-id",
      name: "Test Citizen",
      email: email,
      role: "citizen",
      verified: true
    };
    setUser(mockUser);
    return { success: true, user: mockUser };
  };

  const logout = async () => {
    // Mock logout - just redirect to home
    window.location.href = '/'; 
  };

  const updateUser = (newUser) => {
    setUser(newUser);
  };

  const value = {
    user,
    loading,
    login,
    logout,
    checkAuth,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;