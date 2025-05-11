import { Request, Response } from "express";
import SistemaExamen from "../Servicios/SistemaExamenFacade";
import { MesaInfo } from "../Servicios/NotificacionesPush";

//nueva mesa + notificacion
export const asignarMesa = (req: Request, res: Response) => {
  const mesa: MesaInfo = req.body;
  SistemaExamen.asignarMesa(mesa);
  res.status(201).json({ mensaje: "Mesa asignada y el docente fue notificado" });
};

//confirmacion que el profesor puede asistir
export const confirmar = (req: Request, res: Response) => {
    const {idProfesor, idMesa }= req.body;
    SistemaExamen.confirmarAistencia(idProfesor, idMesa);
    res.status(200).json({mensaje: "Se registro la asistencia"});

};

//el profesor no puede asistir a la mesa

export const rechazar = (req: Request, res: Response) => {
    const {idProfesor, idMesa }= req.body;
    SistemaExamen.rechazarAsistencia(idProfesor, idMesa);
    res.status(200).json({mensaje: "Se registro la inasistencia"});
}
