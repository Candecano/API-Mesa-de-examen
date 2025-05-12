import { Request, Response } from "express";
import SistemaExamen from "../Servicios/SistemaExamenFacade";
import { MesaInfo } from "../Servicios/NotificacionesPush";

// nueva mesa + notificación
export function asignarMesa(req: Request, res: Response): void {
  const mesa: MesaInfo = req.body;
  SistemaExamen.asignarMesa(mesa);
  res.status(201).json({ mensaje: "Mesa asignada y el docente fue notificado" });
}

// confirmación que el profesor puede asistir
export function confirmar(req: Request, res: Response): void {
  const { idProfesor, idMesa } = req.body;
  SistemaExamen.confirmarAistencia(idProfesor, idMesa);
  res.status(200).json({ mensaje: "Se registró la asistencia" });
}

// el profesor no puede asistir a la mesa
export function rechazar(req: Request, res: Response): void {
  const { idProfesor, idMesa } = req.body;
  SistemaExamen.rechazarAsistencia(idProfesor, idMesa);
  res.status(200).json({ mensaje: "Se registró la inasistencia" });
}

// mesas por id de profesor
export async function listarMesas(req: Request, res: Response): Promise<void> {
  const idProfesor = parseInt(req.params.idProfesor);

  if (isNaN(idProfesor)) {
    res.status(400).json({ mensaje: "ID de profesor inválido" });
    return;
  }

  try {
    const mesas = await SistemaExamen.listarMesas(idProfesor);
    res.status(200).json(mesas);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener mesas" });
  }
}
