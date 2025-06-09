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
import router from "../backend/src/suscripcionesRouter";

//configuración de la app para test
const app = express();
app.use(express.json());
app.use("/api/subscripciones", router);


describe("POST /api (suscripciones)", () => {
  it("deberia registrar una suscripcion correctamente", async () => {
    const suscripcionMock = {
      idProfesor: 123,
      subscription: {
      endpoint: "https://fcm.googleapis.com/fake-endpoint",
      expirationTime: null,
      keys: {
        p256dh: "clavePublicaFake",
        auth: "claveAuthFake",
      },
      },
    };

    const res = await request(app)
      .post("/api/subscripciones")
      .send(suscripcionMock)
      .expect(201);

    expect(res.body).toEqual({ message: "Suscripcion registrada con exito" });
  });
});

describe("POST /api/subscripciones/notificar", () => {
  it("deberia enviar una notificacion correctamente", async () => {
    enviarNotificacionMock.mockResolvedValueOnce(undefined);

    const payload = {
      profesor: "Juan Pérez",
      Materia: "Matemática",
      fecha: "2025-05-14",
      Modalidad: "Presencial",
    };

    const res = await request(app)
      .post("/api/subscripciones/notificar")
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
      .post("/api/subscripciones/notificar")
      .send(payload)
      .expect(500);

    expect(res.body).toEqual({ mensaje: "Fallo el envio de la notificacion" });
  });
});
