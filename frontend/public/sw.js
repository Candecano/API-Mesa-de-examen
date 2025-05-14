self.addEventListener("push", (event) => {
  const data = event.data.json();

  const title = data.title || "Notificacion de mesa";
  const options = {
    body: `${data.materia} - ${data.fecha} (${data.modalidad})`,
    icon: "/icon.png",
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});
