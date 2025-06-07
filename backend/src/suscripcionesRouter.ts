import { Router, Request, Response } from "express";
import { registrarSuscripcion } from "./subscripciones"; 
import { NotificacionService } from "./Servicios/NotificacionService";
import { PushNotificationStrategy } from "./Servicios/PushStrategyA";

const router = Router();

const estrategia = new PushNotificationStrategy();
const notificador = new NotificacionService(estrategia);

// Ruta para registrar nueva suscripción
router.post("/", (req: Request, res: Response): void => {
  const { idProfesor, subscription } = req.body;

  if (!idProfesor || !subscription || !subscription.endpoint) {
    console.warn(" Suscripcion invalida:", req.body);
    res.status(400).json({ message: "Suscripcion invalida" });
    return;
  }

  registrarSuscripcion(idProfesor, subscription);
  res.status(201).json({ message: "Suscripcion registrada con exito" });
});

// Ruta para enviar notificación manual
router.post("/notificar", async (req: Request, res: Response) => {
  const { profesor, materia, fecha, modalidad } = req.body;

  const payload = {
    profesor,
    materia,
    fecha,
    modalidad,
  };

  try {
    await notificador.enviarNotificacion("Nueva mesa de examen", payload);
    res.status(200).json({ mensaje: " Notificacion enviada correctamente" });
  } catch (error: any) {
    console.error("Error al enviar notificacion:", error?.message || error);
    res.status(500).json({ mensaje: "Fallo el envio de la notificacion" });
  }
});

export default router;
