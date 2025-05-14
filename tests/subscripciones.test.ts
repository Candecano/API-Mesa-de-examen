const enviarNotificacionMock = jest.fn();

jest.mock("../backend/src/Servicios/NotificacionesPushObserver", () => ({
  agregarSuscripcion: jest.fn(),
}));

jest.mock("../backend/src/Servicios/NotificacionService", () => {
  return {
    NotificacionService: jest.fn().mockImplementation(() => {
      return {
        enviarNotificacion: enviarNotificacionMock,
      };
    }),
  };
});

import request from "supertest";
import express from "express";
import router from "../backend/src/subscripciones";

//configuración de la app para test
const app = express();
app.use(express.json());
app.use("/api", router);


describe("POST /api (suscripciones)", () => {
  it("deberia registrar una suscripcion correctamente", async () => {
    const suscripcionMock = {
      endpoint: "https://fcm.googleapis.com/fake-endpoint",
      expirationTime: null,
      keys: {
        p256dh: "clavePublicaFake",
        auth: "claveAuthFake",
      },
    };

    const res = await request(app)
      .post("/api")
      .send(suscripcionMock)
      .expect(201);

    expect(res.body).toEqual({ message: "Suscripcion registrada" });
  });
});

describe("POST /api/notificar", () => {
  it("deberia enviar una notificacion correctamente", async () => {
    enviarNotificacionMock.mockResolvedValueOnce(undefined);

    const payload = {
      profesor: "Juan Pérez",
      materia: "Matemática",
      fecha: "2025-05-14",
      modalidad: "Presencial",
    };

    const res = await request(app)
      .post("/api/notificar")
      .send(payload)
      .expect(200);

    expect(res.body).toEqual({ mensaje: " Notificacion enviada correctamente" });
  });

  it("deberia devolver error si falla el envio", async () => {
    enviarNotificacionMock.mockRejectedValueOnce(new Error("Error forzado"));

    const payload = {
      profesor: "Error",
      materia: "Test",
      fecha: "2025-05-14",
      modalidad: "Virtual",
    };

    const res = await request(app)
      .post("/api/notificar")
      .send(payload)
      .expect(500);

    expect(res.body).toEqual({ mensaje: "Fallo el envio de la notificacion" });
  });
});
