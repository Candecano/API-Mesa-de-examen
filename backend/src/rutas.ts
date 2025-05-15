//def rutas HTTP y las conecta con los controladores
import { Router } from "express";
import { login } from "./Controladores/AuthController"; // controlador que maneja el login
import {
  asignarMesa,
  confirmarMesa as confirmar,
  notificarMesaDePrueba,
  rechazarMesa as rechazar
} from "./Controladores/GestiondeMesas";
import subscripcionesRouter from "./subscripciones";


const router = Router();
router.post("/login", login);
router.post("/mesa/notificar-prueba", notificarMesaDePrueba);
router.post ("/mesa/asignar", asignarMesa);
router.post ("/mesa/confirmar", confirmar);
router.post ("/mesa/rechazar", rechazar);
router.use("/subscripciones", subscripcionesRouter);
export default router;

//rutas post 
//http://localhost:3000/api/mesa/asignar
//http://localhost:3000/api/mesa/confirmar
//http://localhost:3000/api/mesa/rechazar
// http://localhost:3000/api/subscripciones