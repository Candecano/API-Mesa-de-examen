import { PushSuscripcion } from "../../backend/src/Servicios/PushSuscripcionObserver";
import webpush from "web-push";
import { MesaInfo } from "../../backend/src/Servicios/NotificacionesPushObserver";

// Mock de webpush
jest.mock("web-push");

describe("PushSuscripcion", () => {
  it("deberia enviar una notificacion cuando se actualiza", async () => {
    const fakeSubscription = {
      endpoint: "https://fake-endpoint.com",
      keys: {
        p256dh: "fake-p256dh",
        auth: "fake-auth"
      }
    };

    const observer = new PushSuscripcion(fakeSubscription);

    const mesa: MesaInfo = {
      profesor: 123,
      Materia: "Matematica I",
      fecha: "2025-06-01",
      Modalidad: "Oral"
    };

    await observer.update(mesa);

    expect(webpush.sendNotification).toHaveBeenCalledWith(
      fakeSubscription,
      expect.stringContaining("Nueva mesa asignada")
    );
  });
});


