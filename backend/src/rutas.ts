import { Router } from "express";
import { login } from "./Controladores/AuthController"; // controlador que maneja el login
import {
  asignarMesa,
  confirmarMesa as confirmar,
  rechazarMesa as rechazar
} from "./Controladores/GestiondeMesas";

const router = Router();
router.post("/login", login); // ⬅ nueva ruta de inicio de sesión

router.post ("/mesa/asignar", asignarMesa);
router.post ("/mesa/confirmar", confirmar);
router.post ("/mesa/rechazar", rechazar);

export default router;

//rutas post 
//http://localhost:3000/api/mesa/asignar
//http://localhost:3000/api/mesa/confirmar
//http://localhost:3000/api/mesa/rechazar