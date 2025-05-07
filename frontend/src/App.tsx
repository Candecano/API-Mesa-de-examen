const App = () => {
  const PUBLIC_KEY = "BNtSA1NGMwZYO_1ajvn9UQM7QoPlB5ECCHlPGBTorlFngtKG-GEyk1xeh60GeFzP7zH9rIusN02_MpZ1Jg6iSZo";

  function urlBase64ToUint8Array(base64String: string) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/_/g, "+").replace(/\//g, "/");
    const rawData = atob(base64);
    return new Uint8Array([...rawData].map((char) => char.charCodeAt(0)));
  }

  const subscribe = async () => {
    const registration = await navigator.serviceWorker.register("/sw.js");

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(PUBLIC_KEY),
    });

    await fetch("http://localhost:3000/api/mesa/1234/paranotificar", {
      method: "POST",
      body: JSON.stringify({
        subscription,
        mesa: {
          materia: "Algebra",
          dia: "10/05",
          hora: "10:00",
          modalidad: "Virtual",
        },
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    alert("Suscripto con éxito");
  };

  return (
    <div>
      <h1>Notificaciones de Mesas</h1>
      <button onClick={subscribe}>Suscribirse</button>
    </div>
  );
};

export default App;
