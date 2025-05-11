
import { Router } from "express";
import {asignarMesa, confirmar, rechazar,} from "./src/Controladores/GestiondeMesas";


const router = Router();
router.post ("/mesa/asignar", asignarMesa);
router.post ("/mesa/confirmar", confirmar);
router.post ("/mesa/rechazar", rechazar);


export default router;
