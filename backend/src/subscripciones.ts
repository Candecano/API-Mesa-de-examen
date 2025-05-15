import { Router, Request, Response } from "express";
//lista de observadores gestionadas por el patron observer
//gestiona suscripciones 
import NotificacionPushService from "./Servicios/NotificacionesPushObserver";
import { NotificacionService } from "./Servicios/NotificacionService";
import { PushNotificationStrategy } from "./Servicios/PushStrategyA";

export const subscripciones: any[] = [];
const router = Router();


const estrategia = new PushNotificationStrategy();
const notificador = new NotificacionService(estrategia);

router.post("/", (req: Request, res: Response) => {
  const suscripcion = req.body;
  NotificacionPushService.agregarSuscripcion(suscripcion);
  res.status(201).json({ message: "Suscripcion registrada" });
});


router.post("/notificar", async (req: Request, res: Response) => {
  const { profesor, materia, fecha, modalidad } = req.body;

  const payload = {
    profesor,
    materia,
    fecha,
    modalidad,
  };

  const titulo = "Notificacion manual";

  try {
    await notificador.enviarNotificacion(titulo, payload);
    res.status(200).json({ mensaje: " Notificacion enviada correctamente" });
  } catch (error) {
    console.error("Error al enviar notificacion:", error);
    res.status(500).json({ mensaje: "Fallo el envio de la notificacion" });
  }
});

export default router;
