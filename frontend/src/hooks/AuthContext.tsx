import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  username: string | null;
  idProfesor: number | null;
  login: (user: string, id: number) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [idProfesor, setIdProfesor] = useState<number | null>(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedId = localStorage.getItem('idProfesor');

    if (storedUsername && storedId) {
      setIsAuthenticated(true);
      setUsername(storedUsername);
      setIdProfesor(Number(storedId));
    }
  }, []);

  const login = (user: string, id: number) => {
    localStorage.setItem('username', user);
    localStorage.setItem('idProfesor', id.toString());
    setIsAuthenticated(true);
    setUsername(user);
    setIdProfesor(id);
  };

  const logout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('idProfesor');
    setIsAuthenticated(false);
    setUsername(null);
    setIdProfesor(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, username, idProfesor, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth debe usarse dentro de <AuthProvider>');
  return context;
};
