import { useEffect } from "react";

const clavePublica = "BNtSA1NGMwZYO_1ajvn9UQM7QoPlB5ECCHlPGBTorlFngtKG-GEyk1xeh60GeFzP7zH9rIusN02_MpZ1Jg6iSZo";

function App() {
  useEffect(() => {
    if ("serviceWorker" in navigator && "PushManager" in window) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => {
          console.log("Service Worker registrado", reg);
          suscribirse(reg);
        })
        .catch((err) => console.error("Error registrando SW:", err));
    }
  }, []);

  const suscribirse = async (reg: ServiceWorkerRegistration) => {
    const subscription = await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(clavePublica),
    });

    console.log("Suscripción generada:", subscription);

    await fetch("http://localhost:3000/api/mesa/subscripciones", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(subscription),
    });
  };

  const urlBase64ToUint8Array = (base64String: string): Uint8Array => {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, "+").replace(/\//g, "/");
    const rawData = window.atob(base64);
    return Uint8Array.from([...rawData].map(char => char.charCodeAt(0)));
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Notificaciones Web Push</h1>
      <p>Este navegador se está suscribiendo para recibir notificaciones.</p>
    </div>
  );
}

export default App;
