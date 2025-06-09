/*import request from "supertest";
import express from "express";
import pool from "../../backend/src/Configuracion/db";
import app from "../../backend/src/App";

app.use(express.json());

describe("Mesas Router (integración real)", () => {
  it("debería rechazar POST sin campos obligatorios", async () => {
    const res = await request(app).post("/api/mesas").send({}); // POST a /mesas
    expect(res.status).toBe(400);
    expect(res.body.mensaje).toMatch(/Faltan campos obligatorios/);
  });

  it("debería aceptar POST con datos válidos y guardar en la base", async () => {
    const res = await request(app).post("/api/mesas").send({
      profesor: 101,
      Materia: "Integración",
      fecha: "2025-06-25 00:00:00",
      Modalidad: "Presencial"
    });

    console.log("Respuesta del POST:", res.body);

    expect(res.status).toBe(201);
    expect(res.body.mensaje).toMatch(/Mesa creada con exito/);

    await new Promise(resolve => setTimeout(resolve, 100));
    const [rows]: any = await pool.execute(
    "SELECT * FROM mesadeexamen WHERE profesor = ? AND Materia = ?",
    [101, "Integración"]
);
    expect(rows.length).toBeGreaterThan(0);
  });

  it("debería obtener mesas por idProfesor", async () => {
    const res = await request(app).get("/api/mesas/101"); // GET a /mesas/101
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.some((m: any) => m.Materia === "Integración")).toBe(true);
  });
})*/

import { Request, Response } from 'express';
import request from 'supertest';
import express from 'express';
import router from '../../backend/src/Controladores/Mesas';
import { MesaRepository } from '../../backend/src/Servicios/MesaRepository';
import NotificacionPushService from '../../backend/src/Servicios/NotificacionesPushObserver';

jest.mock('../../backend/src/Servicios/MesaRepository');
jest.mock('../../backend/src/Servicios/NotificacionesPushObserver');

const app = express();
app.use(express.json());
app.use('/api/mesas', router);

describe('Controlador de Mesas', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/mesas/Mesas', () => {
    it('debería crear una mesa exitosamente', async () => {
      const mesaData = {
        profesor: 1,
        Materia: 'Matemáticas',
        fecha: '2024-01-01',
        Modalidad: 'Presencial'
      };

      const response = await request(app)
        .post('/api/mesas')
        .send(mesaData);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('mensaje', 'Mesa creada con exito');
      expect(response.body).toHaveProperty('mesa');
      expect(NotificacionPushService.notify).toHaveBeenCalledWith(mesaData);
    });

    it('debería retornar 400 cuando faltan campos obligatorios', async () => {
      const mesaIncompleta = {
        profesor: 1,
        Materia: 'Matemáticas'
        // Faltan fecha y Modalidad
      };

      const response = await request(app)
        .post('/api/mesas')
        .send(mesaIncompleta);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('mensaje', 'Faltan campos obligatorios');
    });

    it('debería manejar errores de notificación', async () => {
  const mesaData = {
    profesor: 1,
    Materia: 'Matemáticas',
    fecha: '2024-01-01',
    Modalidad: 'Presencial'
  };

   (NotificacionPushService.notify as jest.Mock).mockRejectedValueOnce(
     new Error('Error de notificación')
   );

   const response = await request(app)
    .post('/api/mesas')
    .send(mesaData);

   expect(response.status).toBe(500);
   expect(response.body).toHaveProperty('mensaje', 'Error al crear la mesa o notificar');
 });

  });

  describe('GET /api/mesas/:idProfesor', () => {
    it('debería obtener las mesas de un profesor', async () => {
      const mesasEsperadas = [
        { id: 1, Materia: 'Matemáticas', fecha: '2024-01-01', Modalidad: 'Presencial' }
      ];

      (MesaRepository.prototype.obtenerMesasPorProfesor as jest.Mock).mockResolvedValueOnce(mesasEsperadas);

      const response = await request(app).get('/api/mesas/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mesasEsperadas);
    });

    it('debería manejar errores al obtener mesas', async () => {
      (MesaRepository.prototype.obtenerMesasPorProfesor as jest.Mock).mockRejectedValueOnce(
        new Error('Error de base de datos')
      );

      const response = await request(app).get('/api/mesas/1');

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('mensaje', 'Error al obtener mesas');
    });
  });
});
