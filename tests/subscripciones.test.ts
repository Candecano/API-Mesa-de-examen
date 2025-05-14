import request from "supertest";
import express from "express";
import router from "../backend/src/subscripciones";

// Mock del servicio para evitar efectos reales
jest.mock("../backend/src/Servicios/NotificacionesPushObserver", () => ({
  agregarSuscripcion: jest.fn(),
}));

const app = express();
app.use(express.json());
app.use("/api", router);

describe("POST /api/subscripciones", () => {
  it("debería registrar una suscripción correctamente", async () => {
    const suscripcionMock = {
      endpoint: "https://fcm.googleapis.com/fake-endpoint",
      expirationTime: null,
      keys: {
        p256dh: "clavePublicaFake",
        auth: "claveAuthFake",
      },
    };

    const res = await request(app)
      .post("/api/subscripciones")
      .send(suscripcionMock)
      .expect(201);

    expect(res.body).toEqual({ message: "Suscripción registrada" });
  });
});
