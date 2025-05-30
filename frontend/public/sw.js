/* self.addEventListener("push", (event) => {
  console.log("📥 EVENTO PUSH RECIBIDO:", event);

  let data = {};
  try {
    data = event.data.json();
  } catch (e) {
    data = {
      title: "Notificación",
      body: event.data?.text() || "Sin contenido"
    };
  }

  console.log("📦 Datos recibidos:", data);

  const title = data.title || "Notificación de mesa";
  const options = {
    body: data.body || "Nueva notificación",
    icon: "/icon.png", // asegurate que este archivo exista
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});
*/
self.addEventListener("push", function(event) {
  console.log("📥 PUSH RECIBIDO");

  const title = "🚨 Notificación directa";
  const options = {
    body: "Esto es un mensaje simple",
    icon: "https://cdn-icons-png.flaticon.com/512/545/545705.png"
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});
