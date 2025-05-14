import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './componentes/Auth/LoginPage';
import ExamNotificationsPage from './pages/ExamNotificationsPage';
import { useAuth } from './hooks/AuthContext';

const clavePublica = "BNtSA1NGMwZYO_1ajvn9UQM7QoPlB5ECCHlPGBTorlFngtKG-GEyk1xeh60GeFzP7zH9rIusN02_MpZ1Jg6iSZo";

function App() {
  const { isAuthenticated, login } = useAuth();

  useEffect(() => {
    if ("serviceWorker" in navigator && "PushManager" in window) {
      navigator.serviceWorker
        .register("/sw.js")
        .then(async (reg) => {
          console.log("✅ Service Worker registrado:", reg);

          const subscription = await reg.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(clavePublica),
          });

          console.log("📩 Suscripción generada:", subscription);

          await fetch("http://localhost:3000/api/subscripciones", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(subscription),
          });

          console.log("📨 Suscripción enviada al backend");
        })
        .catch((err) => console.error("❌ Error registrando SW:", err));
    }
  }, []);

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
