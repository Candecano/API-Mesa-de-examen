self.addEventListener("push", (event) => {
  console.log("📥 PUSH recibido");

  let data = {
    title: "📢 Notificación",
    body: "Tienes una nueva notificación",
  };

  try {
    if (event.data) {
      const parsedData = event.data.json();
      data.title = parsedData.title || data.title;
      data.body = parsedData.body || data.body;
    }
  } catch (e) {
    console.error("❌ Error al parsear el evento:", e);
  }

  const options = {
    body: data.body,
    icon: "https://cdn-icons-png.flaticon.com/512/545/545705.png",
    data: data,
  };

  event.waitUntil(self.registration.showNotification(data.title, options));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow("http://localhost:5173/examenes"));
});
