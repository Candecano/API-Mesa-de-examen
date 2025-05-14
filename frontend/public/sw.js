self.addEventListener("push", (event) => {
  const data = event.data.json();

  const title = data.title || "Notificacion de mesa asignada";

  const options = {
    body: `${data.materia || 'Materia desconocida'} - ${data.fecha || 'Fecha no definida'} (${data.modalidad || 'modalidad no indicada'})`,
    icon: "/icon.png", 
    vibrate: [100, 50, 100],
    tag: "mesa-examen-notif",
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});
