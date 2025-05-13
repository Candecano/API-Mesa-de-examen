import request from "supertest";
import express from "express";
import rutas from "../backend/src/rutas";

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
});
