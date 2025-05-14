import { useState, useEffect } from 'react';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  const login = (user: string) => {
    setIsAuthenticated(true);
    setUsername(user);
    // Aquí podrías guardar el estado en localStorage o similar
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUsername(null);
    // Aquí podrías limpiar el estado del localStorage
  };

  // Simulación de carga de estado al iniciar la aplicación
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setIsAuthenticated(true);
      setUsername(storedUsername);
    }
  }, []);

  // Simulación de guardado del estado al cambiar
  useEffect(() => {
    if (username) {
      localStorage.setItem('username', username);
    } else {
      localStorage.removeItem('username');
    }
  }, [username]);

  return { isAuthenticated, username, login, logout };
};

export default useAuth;