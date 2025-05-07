import { useEffect, useState } from "react";

const clavePublica = "BNtSA1NGMwZYO_1ajvn9UQM7QoPlB5ECCHlPGBTorlFngtKG-GEyk1xeh60GeFzP7zH9rIusN02_MpZ1Jg6iSZo";

function App() {
  const [registro, setRegistro] = useState<ServiceWorkerRegistration | null>(null);
  const [suscrito, setSuscrito] = useState(false);

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
    <div style={{ padding: "2rem" }}>
      <h1>Notificaciones Web Push</h1>
      {!suscrito ? (
        <>
          <p>Haz clic para suscribirte a las notificaciones:</p>
          <button onClick={suscribirse}>Suscribirse</button>
        </>
      ) : (
        <p>¡Ya estás suscrito a las notificaciones!</p>
      )}
    </div>
  );
}

export default App;
