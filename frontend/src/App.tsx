import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './componentes/Auth/LoginPage';
import ExamNotificationsPage from './pages/ExamNotificationsPage';
import useAuth from './hooks/useAuth';

const clavePublica = "BNtSA1NGMwZYO_1ajvn9UQM7QoPlB5ECCHlPGBTorlFngtKG-GEyk1xeh60GeFzP7zH9rIusN02_MpZ1Jg6iSZo";

function App() {
  const [registro, setRegistro] = useState<ServiceWorkerRegistration | null>(null);
  const [suscrito, setSuscrito] = useState(false);
  const { isAuthenticated, login } = useAuth(); // Usa el hook de autenticación aquí

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

  const suscribirse = async () => {
    if (!registro) return;

    const subscription = await registro.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(clavePublica),
    });

    console.log("Suscripción generada:", subscription);

    await fetch("http://localhost:3000/api/mesa/subscripciones", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(subscription),
    });

    setSuscrito(true);
  };

  const urlBase64ToUint8Array = (base64String: string): Uint8Array => {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
    const rawData = window.atob(base64);
    return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={!isAuthenticated ? <LoginPage onLogin={login} /> : <Navigate to="/examenes" />} />
        <Route path="/examenes" element={isAuthenticated ? <ExamNotificationsPage /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;