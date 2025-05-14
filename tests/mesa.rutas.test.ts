import request from "supertest";
import express from "express";
import rutas from "../backend/src/rutas";

jest.mock("../backend/src/Configuracion/db", () => ({
  default: {
    execute: jest.fn().mockResolvedValue([]) // evita cuelgue en db
  }
}));

jest.mock("../backend/src/Servicios/NotificacionService", () => {
  return {
    NotificacionService: jest.fn().mockImplementation(() => ({
      enviarNotificacion: jest.fn().mockResolvedValue(undefined)
    }))
  };
});

const app = express();
app.use(express.json());
app.use(rutas);

describe("Tests para las rutas de mesa", () => {
  it("POST /mesa/asignar", async () => {
    const response = await request(app).post("/mesa/asignar").send({
      id: 1,
      profesor: 1,
      materia: "Física",
      fecha: "2025-07-10",
      hora: "10:00",
      modalidad: "Presencial"
    });

    expect([200, 201]).toContain(response.status);
  });
  
  it("PUT /mesa/modificar debe devolver 200", async () => {
  const response = await request(app).put("/mesa/modificar").send({
    id: 1,
    materia: "Matemática",
    fecha: "2025-06-01",
    hora: "10:00",
    modalidad: "Presencial"
  });

  expect(response.status).toBe(200);
});
});
