import { Router, Request, Response } from "express";
import NotificacionPushService from "../Servicios/NotificacionesPushObserver";
import { MesaInfo } from "../Servicios/NotificacionesPushObserver";
import { MesaRepository } from "../Servicios/MesaRepository"; 

const router = Router();
const mesaRepo = new MesaRepository(); 
//  POST: Crear una nueva mesa y notificar
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

// get para btener mesas por ID de profesor
router.get("/:idProfesor", async (req: Request, res: Response) => {
  const { idProfesor } = req.params;

  try {
    const mesas = await mesaRepo.obtenerMesasPorProfesor(Number(idProfesor));
    res.json(mesas);
  } catch (error) {
    console.error("Error al obtener mesas:", error);
    res.status(500).json({ mensaje: "Error al obtener mesas" });
  }
});

export default router;
