import { Router } from "express";
import { login } from "./Controladores/AuthController";
import {
  asignarMesa,
  confirmarMesa as confirmar,
  notificarMesaDePrueba,
  rechazarMesa as rechazar
} from "./Controladores/GestiondeMesas";
import subscripcionesRouter from "./subscripciones";
import mesasRouter from "./Controladores/Mesas"; 

const router = Router();

router.post("/login", login);
router.post("/mesa/notificar-prueba", notificarMesaDePrueba);
router.post("/mesa/asignar", asignarMesa);
router.post("/mesa/confirmar", confirmar);
router.post("/mesa/rechazar", rechazar);

router.use("/subscripciones", subscripcionesRouter);
router.use("/mesas", mesasRouter);

export default router;
