// backend/src/Controladores/mesas.ts

import { Router, Request, Response } from "express";
import NotificacionPushService from "../Servicios/NotificacionesPushObserver";
import { MesaInfo } from "../Servicios/NotificacionesPushObserver";

const router = Router();

// Crear una nueva mesa y notificar
router.post("/Mesas", async (req: Request, res: Response): Promise<void> => {
  const { profesor, materia, fecha, modalidad } = req.body;

  if (!profesor || !materia || !fecha || !modalidad) {
    res.status(400).json({ mensaje: "Faltan campos obligatorios" });
    return;
  }

  const nuevaMesa: MesaInfo = {
    profesor,
    materia,
    fecha,
    modalidad
  };

  try {
    NotificacionPushService.notify(nuevaMesa);
    console.log(" Mesa creada y notificada:", nuevaMesa);
    res.status(201).json({ mensaje: "Mesa creada con exito", mesa: nuevaMesa });
  } catch (error: any) {
    console.error(" Error al notificar:", error?.message || error);
    res.status(500).json({ mensaje: "Error al crear la mesa o notificar" });
  }
});

export default router;
