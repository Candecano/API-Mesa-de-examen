import request from "supertest";
import app from "../../backend/src/App"; 

describe("Controlador GestionDeMesas", () => {
  it("deberia asignar una mesa y notificar al docente", async () => {
    const res = await request(app).post("/api/mesa/asignar").send({
      id: 1,
      materia: "Base de Datos",
      fecha: "2025-07-01",
      hora: "09:00",
      modalidad: "Digital"
    });

    expect(res.status).toBe(201);
    expect(res.body.mensaje).toBe("Mesa asignada y el docente fue notificado");
  });

  it("deberia registrar la asistencia del profesor", async () => {
    const res = await request(app).post("/api/mesa/confirmar").send({
      idProfesor: 101,
      idMesa: 1
    });

    expect(res.status).toBe(200);
    expect(res.body.mensaje).toBe("Se registro la asistencia");
  });

  it("deberia registrar la inasistencia del profesor", async () => {
    const res = await request(app).post("/api/mesa/rechazar").send({
      idProfesor: 101,
      idMesa: 1
    });

    expect(res.status).toBe(200);
    expect(res.body.mensaje).toBe("Se registro la inasistencia");
  });

  it("deberia enviar una notificacion de prueba", async () => {
    const res = await request(app).post("/api/mesa/notificar-prueba");

    expect(res.status).toBe(200);
    expect(res.body.mensaje).toBe("Notificacion enviada correctamente");
  });
});
