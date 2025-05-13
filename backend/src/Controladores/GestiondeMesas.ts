import { Request, Response } from "express";
import { SistemaExamenFacade } from "../Servicios/SistemaExamenFacade";
import { MesaInfo } from "../Servicios/NotificacionesPushObserver";
import { MesaRepository } from "../Servicios/MesaRepository";
import { RespuestaProfesorService } from "../Servicios/RespuestaProfesorService";
import { NotificacionService } from "../Servicios/NotificacionService";
//cliente de facade
const mesaRepo = new MesaRepository();
const respuestaService = new RespuestaProfesorService();
const notificador = new NotificacionService();

//Facade para usar en los metodos ya definidos
const facade = new SistemaExamenFacade(mesaRepo, respuestaService, notificador);
//nueva mesa + notificacion
export const asignarMesa = async(req: Request, res: Response) => {
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

//confirmacion que el profesor puede asistir
export const confirmarMesa = async(req: Request, res: Response) => {
    const {idProfesor, idMesa }= req.body;
    await facade.confirmarMesa(idProfesor, idMesa);
    res.status(200).json({mensaje: "Se registro la asistencia"});
};
//el profesor no puede asistir a la mesa
export const rechazarMesa = async(req: Request, res: Response) => {
    const {idProfesor, idMesa }= req.body;
    await facade.rechazarMesa(idProfesor, idMesa);
    res.status(200).json({mensaje: "Se registro la inasistencia"});
}
