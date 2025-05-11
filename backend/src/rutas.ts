import { Router } from "express";
import {asignarMesa, confirmar, rechazar,} from "./Controladores/GestiondeMesas";


const router = Router();
router.post ("/mesa/asignar", asignarMesa);
router.post ("/mesa/confirmar", confirmar);
router.post ("/mesa/rechazar", rechazar);

export default router;

//rutas post 
//http://localhost:3000/api/mesa/asignar
//http://localhost:3000/api/mesa/confirmar
//http://localhost:3000/api/mesa/rechazar