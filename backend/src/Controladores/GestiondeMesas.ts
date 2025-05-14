import { Request, Response } from "express";
import { SistemaExamenFacade } from "../Servicios/SistemaExamenFacade";
import { MesaInfo } from "../Servicios/NotificacionesPushObserver";
import { MesaRepository } from "../Servicios/MesaRepository";
import { RespuestaProfesorService } from "../Servicios/RespuestaProfesorService";
import { NotificacionService } from "../Servicios/NotificacionService";
import { PushNotificationStrategy } from "../Servicios/PushStrategyA";

// Cliente de Facade
const mesaRepo = new MesaRepository();
const respuestaService = new RespuestaProfesorService();
const estrategia = new PushNotificationStrategy();
const notificador = new NotificacionService(estrategia);

// Facade para usar en los métodos ya definidos
const facade = new SistemaExamenFacade(mesaRepo, respuestaService, notificador);

// Nueva mesa + notificación
export const asignarMesa = async (req: Request, res: Response) => {
  const mesa: {
    id: number;
    materia: string;
    fecha: string;
    hora: string;
    modalidad: string;
  } = req.body;

  await facade.asignarMesa(mesa);
  res.status(201).json({ mensaje: "Mesa asignada y el docente fue notificado" });
};

// Confirmación que el profesor puede asistir
export const confirmarMesa = async (req: Request, res: Response) => {
  const { idProfesor, idMesa } = req.body;
  await facade.confirmarMesa(idProfesor, idMesa);
  res.status(200).json({ mensaje: "Se registró la asistencia" });
};

// El profesor no puede asistir a la mesa
export const rechazarMesa = async (req: Request, res: Response) => {
  const { idProfesor, idMesa } = req.body;
  await facade.rechazarMesa(idProfesor, idMesa);
  res.status(200).json({ mensaje: "Se registró la inasistencia" });
};

export const notificarMesaDePrueba = async (req: Request, res: Response) => {
  const payload = {
    profesor: "Juan Pérez",
    materia: "Álgebra y Lógica",
    fecha: "2025-06-25",
    modalidad: "Presencial",
  };

  const titulo = "Notificación de prueba";

  try {
    await notificador.enviarNotificacion(titulo, payload); // ✅ Dos argumentos
    res.status(200).json({ mensaje: "✅ Notificación enviada correctamente" });
  } catch (error) {
    console.error("❌ Error al enviar notificación:", error);
    res.status(500).json({ mensaje: "❌ Falló el envío de la notificación" });
  }
};
