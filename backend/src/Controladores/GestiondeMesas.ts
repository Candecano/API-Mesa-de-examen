//GestiondeMesas.ts actua como cliente
//logica de las mesas  crear, responder, listar
import { Request, Response } from "express";
import { SistemaExamenFacade } from "../Servicios/SistemaExamenFacade";
import { MesaInfo } from "../Servicios/NotificacionesPushObserver";
import { MesaRepository } from "../Servicios/MesaRepository";
import { RespuestaProfesorService } from "../Servicios/RespuestaProfesorService";
import { NotificacionService } from "../Servicios/NotificacionService";
import { PushNotificationStrategy } from "../Servicios/PushStrategyA";

//cliente de Facade
const mesaRepo = new MesaRepository();
const respuestaService = new RespuestaProfesorService();
const estrategia = new PushNotificationStrategy();
const notificador = new NotificacionService(estrategia);

//facade para usar en los metodos ya definidos
const facade = new SistemaExamenFacade(mesaRepo, respuestaService, notificador);

//nueva mesa + notificacion
export const asignarMesa = async (req: Request, res: Response) => {
  const mesa: {
    id: number;
    Materia: string;
    fecha: string;
    Modalidad: string;
  } = req.body;

  await facade.asignarMesa(mesa);
  res.status(201).json({ mensaje: "Mesa asignada y el docente fue notificado" });
};

//confirmacion que el profesor puede asistir
export const confirmarMesa = async (req: Request, res: Response) => {
  const { idProfesor, idMesa } = req.body;
  await facade.confirmarMesa(idProfesor, idMesa);
  res.status(200).json({ mensaje: "Se registro la asistencia" });
};

//el profesor no puede asistir a la mesa
export const rechazarMesa = async (req: Request, res: Response) => {
  const { idProfesor, idMesa } = req.body;
  await facade.rechazarMesa(idProfesor, idMesa);
  res.status(200).json({ mensaje: "Se registro la inasistencia" });
};

export const notificarMesaDePrueba = async (req: Request, res: Response) => {
  const payload = {
    Profesor: "Paulo Guzman",
    Materia: "Analisis Matematico",
    fecha: "2025-06-25",
    Modalidad: "Presencial",
  };

  const titulo = "Notificacion de prueba";

  try {
    await notificador.enviarNotificacion(titulo, payload);
    res.status(200).json({ mensaje: "Notificacion enviada correctamente" });
  } catch (error) {
    console.error("Error al enviar notificacion:", error);
    res.status(500).json({ mensaje: "Fallo el envio de la notificacion" });
  }
};
