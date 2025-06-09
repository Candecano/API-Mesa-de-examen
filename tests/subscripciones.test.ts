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

    it("deberia devolver error si la suscripcion es invalida", async () => {
    const invalidSubscription = {
      idProfesor: 123,
      subscription: {}, // Suscripción incompleta
    };

    const res = await request(app)
      .post("/api/subscripciones")
      .send(invalidSubscription)
      .expect(400);

    expect(res.body).toEqual({ message: "Suscripcion invalida" });
  });  
  
  describe("POST /api/subscripciones", () => {

  
    it("deberia rechazar una suscripcion sin idProfesor", async () => {
      const suscripcionSinId = {
        subscription: {
          endpoint: "https://endpoint",
          expirationTime: null,
          keys: { p256dh: "a", auth: "b" },
        },
      };
  
      const res = await request(app)
        .post("/api/subscripciones")
        .send(suscripcionSinId)
        .expect(400);
  
      expect(res.body).toEqual({ message: "Suscripcion invalida" });
    });
  
    it("deberia rechazar una suscripcion sin subscription", async () => {
      const suscripcionSinSub = {
        idProfesor: 1,
      };
  
      const res = await request(app)
        .post("/api/subscripciones")
        .send(suscripcionSinSub)
        .expect(400);
  
      expect(res.body).toEqual({ message: "Suscripcion invalida" });
    });
  
    it("deberia rechazar una suscripcon con subscription sin endpoint", async () => {
      const suscripcionSinEndpoint = {
        idProfesor: 1,
        subscription: {
          expirationTime: null,
          keys: { p256dh: "a", auth: "b" },
        },
      };
  
      const res = await request(app)
        .post("/api/subscripciones")
        .send(suscripcionSinEndpoint)
        .expect(400);
  
      expect(res.body).toEqual({ message: "Suscripcion invalida" });
    });
  
    it("deberia aceptar suscripciones duplicadas pero no duplicar en la logica interna", async () => {
      const sub = {
        idProfesor: 1,
        subscription: {
          endpoint: "https://endpoint-dup",
          expirationTime: null,
          keys: { p256dh: "a", auth: "b" },
        },
      };
  
      await request(app).post("/api/subscripciones").send(sub).expect(201);
      await request(app).post("/api/subscripciones").send(sub).expect(201);
      
    });
  
    it("deberia aceptar varias suscripciones para distintos profesores", async () => {
      const sub1 = {
        idProfesor: 1,
        subscription: {
          endpoint: "https://endpoint1",
          expirationTime: null,
          keys: { p256dh: "a", auth: "b" },
        },
      };
      const sub2 = {
        idProfesor: 2,
        subscription: {
          endpoint: "https://endpoint2",
          expirationTime: null,
          keys: { p256dh: "c", auth: "d" },
        },
      };
  
      await request(app).post("/api/subscripciones").send(sub1).expect(201);
      await request(app).post("/api/subscripciones").send(sub2).expect(201);
    });
  });
});
