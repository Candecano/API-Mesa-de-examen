import request from "supertest";
import express from "express";
import rutas from "../backend/src/rutas";

//mock de db
jest.mock("../backend/src/Configuracion/db", () => {
  return {
    __esModule: true, 
    default: {
      execute: jest.fn().mockResolvedValue([[], []]) //simula respuesta de mysql2
    }
  };
});

//mock del servicio de notificacion
jest.mock("../backend/src/Servicios/NotificacionService", () => {
  return {
    NotificacionService: jest.fn().mockImplementation(() => ({
      enviarNotificacion: jest.fn().mockResolvedValue(undefined)
    }))
  };
});


const app = express();
app.use(express.json());
app.use("/api", rutas); 

describe("Tests para las rutas de mesa", () => {
  it("POST /api/mesa/asignar debe devolver 200 o 201", async () => {
    const response = await request(app).post("/api/mesa/asignar").send({
      id: 1,
      profesor: 1,
      materia: "Fisica",
      fecha: "2025-07-10",
      hora: "10:00",
      modalidad: "Presencial"
    });

    expect([200, 201]).toContain(response.status);
  });

  it("POST /api/mesa/confirmar debe devolver 200", async () => {
    const response = await request(app).post("/api/mesa/confirmar").send({
      id: 1,
      profesor: 1
    });

    expect(response.status).toBe(200);
  });

  it("POST /api/mesa/rechazar debe devolver 200", async () => {
    const response = await request(app).post("/api/mesa/rechazar").send({
      id: 1,
      profesor: 1
    });

    expect(response.status).toBe(200);
  });
});
