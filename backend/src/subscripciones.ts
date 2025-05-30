import { Router, Request, Response } from "express";
import NotificacionPushService from "./Servicios/NotificacionesPushObserver";
import { NotificacionService } from "./Servicios/NotificacionService";
import { PushNotificationStrategy } from "./Servicios/PushStrategyA";

const router = Router();

const estrategia = new PushNotificationStrategy();
const notificador = new NotificacionService(estrategia);

// 👉 Registrar nueva suscripción
router.post("/", (req: Request, res: Response): void => {
  const suscripcion = req.body;

  if (!suscripcion || !suscripcion.endpoint) {
    console.warn("⚠️ Suscripción inválida recibida:", suscripcion);
    res.status(400).json({ message: "Suscripción inválida" });
    return;
  }

  NotificacionPushService.agregarSuscripcion(suscripcion);
  console.log("✅ Suscripción registrada:", suscripcion.endpoint);
  res.status(201).json({ message: "Suscripción registrada con éxito" });
});

// 👉 Enviar notificación manual
router.post("/notificar", async (req: Request, res: Response) => {
  const { profesor, materia, fecha, modalidad } = req.body;

  const payload = JSON.stringify({
    title: "📢 Notificación manual",
    body: `Profesor: ${profesor}\nMateria: ${materia}\nFecha: ${fecha}\nModalidad: ${modalidad}`,
  });

  console.log("📤 Enviando notificación a profesor:", profesor);

  try {
    await notificador.enviarNotificacion("📢 Notificación manual", payload);
    console.log("✅ Notificación enviada con éxito.");
    res.status(200).json({ mensaje: "Notificación enviada correctamente" });
  } catch (error: any) {
    console.error("❌ Error al enviar notificación:", error?.message || error);
    res.status(500).json({ mensaje: "Falló el envío de la notificación" });
  }
});

export default router;
