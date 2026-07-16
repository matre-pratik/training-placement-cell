import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

function loadStoredUser() {
  try {
    const raw = localStorage.getItem('tpc_user');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {

  const [user, setUser] = useState(loadStoredUser);

  const login = (data) => {
    // data.token must be included (comes back from POST /api/auth/login)
    if (data?.token) {
      localStorage.setItem('tpc_token', data.token);
    }
    localStorage.setItem('tpc_user', JSON.stringify(data));
    setUser(data);
  };

  const logout = () => {
    localStorage.removeItem('tpc_token');
    localStorage.removeItem('tpc_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
