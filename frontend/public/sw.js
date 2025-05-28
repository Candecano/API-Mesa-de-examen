self.addEventListener("push", (event) => {
  console.log(" EVENTO PUSH RECIBIDO:", event); // <-- ESTE ES EL CONSOLE.LOG

  let data = {};
  try {
    data = event.data.json();
  } catch (e) {
    data = {
      title: "Notificación",
      body: event.data.text()
    };
  }

  const title = data.title || "Notificación de mesa";
  const options = {
    body: data.body || `${data.materia} - ${data.fecha} (${data.modalidad})`,
    icon: "/icon.png",
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});
