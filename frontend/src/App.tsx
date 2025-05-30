import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./componentes/Auth/LoginPage";
import ExamNotificationsPage from "./pages/ExamNotificationsPage";
import { useAuth } from "./hooks/AuthContext";

const clavePublica = "BNtSA1NGMwZYO_1ajvn9UQM7QoPlB5ECCHlPGBTorlFngtKG-GEyk1xeh60GeFzP7zH9rIusN02_MpZ1Jg6iSZo";

function App() {
  const { isAuthenticated, login } = useAuth();

  useEffect(() => {
    const registrarServiceWorkerYSubscribirse = async () => {
      if ("serviceWorker" in navigator && "PushManager" in window) {
        try {
          const reg = await navigator.serviceWorker.register("/sw.js");
          console.log("✅ Service Worker registrado:", reg);

          const permiso = await Notification.requestPermission();
          if (permiso !== "granted") {
            console.warn("❌ Permiso para notificaciones denegado");
            return;
          }

          const existingSubscription = await reg.pushManager.getSubscription();
          if (existingSubscription) {
            console.log("🔄 Ya existe una suscripción activa.");
            return;
          }

          const nuevaSuscripcion = await reg.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(clavePublica),
          });

          console.log("📨 Suscripción generada:", JSON.stringify(nuevaSuscripcion));

          const response = await fetch("http://localhost:3000/api/subscripciones", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nuevaSuscripcion),
          });

          if (response.ok) {
            console.log("📬 Suscripción enviada al backend con éxito");
          } else {
            console.error("❌ Falló el envío de la suscripción al backend:", response.status);
          }
        } catch (err) {
          console.error("🔥 Error durante el registro de SW o la suscripción:", err);
        }
      }
    };

    registrarServiceWorkerYSubscribirse();
  }, []);

  const urlBase64ToUint8Array = (base64String: string) => {
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
        <Route path="/" element={!isAuthenticated ? <LoginPage onLogin={login} /> : <Navigate to="/examenes" />} />
        <Route path="/examenes" element={isAuthenticated ? <ExamNotificationsPage /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
