import { Router, Request, Response } from "express";
import NotificacionPushService from "./Servicios/NotificacionesPushObserver";

export const subscripciones: any[] = [];
const router = Router();

router.post("/subscripciones", (req: Request, res: Response) => {
  const suscripcion = req.body;
  NotificacionPushService.agregarSuscripcion(suscripcion);
  res.status(201).json({ message: "Suscripción registrada" });
});

export default router;