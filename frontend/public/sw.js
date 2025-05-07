self.addEventListener("push", (event) => {
    const data = event.data.json();
    const title = "Notificacion de mesa";
    const options = {
      body: `${data.materia} - ${data.dia} a las ${data.hora} (${data.modalidad})`,
      icon: "/icon.png",
    };
  
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  });
  