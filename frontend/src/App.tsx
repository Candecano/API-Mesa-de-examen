import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './componentes/Auth/LoginPage';
import ExamNotificationsPage from './pages/ExamNotificationsPage';
import { useAuth } from './hooks/AuthContext';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const clavePublica = "BNtSA1NGMwZYO_1ajvn9UQM7QoPlB5ECCHlPGBTorlFngtKG-GEyk1xeh60GeFzP7zH9rIusN02_MpZ1Jg6iSZo";

function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [registro, setRegistro] = useState<ServiceWorkerRegistration | null>(null);
  const { isAuthenticated, login } = useAuth();

  useEffect(() => {
    if ("serviceWorker" in navigator && "PushManager" in window) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => {
          console.log("Service Worker registrado", reg);
          setRegistro(reg);
        })
        .catch((err) => console.error("Error registrando SW:", err));
    }
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const urlBase64ToUint8Array = (base64String: string): Uint8Array => {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={!isAuthenticated ? <LoginPage onLogin={login} /> : <Navigate to="/examenes" />}
        />
        <Route
          path="/examenes"
          element={isAuthenticated ? <ExamNotificationsPage /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
