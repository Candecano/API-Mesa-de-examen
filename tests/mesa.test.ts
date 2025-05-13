// tests/mesa.test.ts

import request from "supertest";
import express from "express";
import rutas from "../backend/src/rutas"; 

const app = express();
app.use(express.json());
app.use(rutas);

describe("Tests para las rutas de mesa", () => {
  it("POST /mesa/asignar - debería asignar una mesa correctamente", async () => {
    const response = await request(app).post("/mesa/asignar").send({
      profesor: "profesor1",
      materia: "Física II",
      fecha: "2025-07-10",
      hora: "14:00",
    });

    expect(response.status).toBe(201);
    expect(response.body.mensaje).toBe("Mesa asignada y el docente fue notificado");
  });

  it("POST /mesa/confirmar - debería registrar asistencia", async () => {
    const response = await request(app).post("/mesa/confirmar").send({
      idProfesor: "profesor1",
      idMesa: "mesa1",
    });

    expect(response.status).toBe(200);
    expect(response.body.mensaje).toBe("Se registro la asistencia");
  });

  it("POST /mesa/rechazar - debería registrar inasistencia", async () => {
    const response = await request(app).post("/mesa/rechazar").send({
      idProfesor: "profesor1",
      idMesa: "mesa1",
    });

    expect(response.status).toBe(200);
    expect(response.body.mensaje).toBe("Se registro la inasistencia");
  });
});
