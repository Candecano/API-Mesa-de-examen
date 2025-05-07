import { Router , Request, Response} from 'express';
import webPush from './webpush';

const router = Router();
let subscripciones: any[]=[]; // Array para almacenar las subs a las subscripciones
//para registrar las subscripciones
router.post("/subscripciones", (req: Request, res: Response) => {
const subcripcion =req.body;

subscripciones.push(subcripcion); // Agregar la sub al array
console.log(" nueva subcripcion registrada",subcripcion);
res.status(201).json({ message: "subscripcion regsitrada" });
});


//notificacion al profesor
router.post("/:id/paranotificar", (req: Request, res: Response) =>{
const {Idprofe}=req.params//se obtiene el id del profesor 
const { materia, fecha, hora, aula, modalidad } = req.body;//se obtiene el cuerpo de la subcripcion

console.log("Nueva mesa de examen creada ${Idprofe} " );
console.log ("Materia: ${materia} " );
console.log ("Fecha: ${fecha} " );
console.log ("Hora: ${hora} " );
console.log ("Aula: ${aula} " );
console.log ("Modalidad: ${modalidad} " );

const payload =JSON.stringify({
title: "Nueva mesa de examen agregada",
body : `Materia: ${materia}, Fecha: ${fecha}, Hora: ${hora}, Aula: ${aula}, Modalidad: ${modalidad}`,
});

//se envia la notif a los profesores
subscripciones.forEach ((subcripcion) => {
    webPush.sendNotification(subcripcion, payload).catch ((err: Error) => {
console.error("No se pudo enviar la subcripcion:", err);
});
});


res.status(200).json({ message: `Notificación enviada al profesor ${Idprofe}` });
});

//para probar
router.post("/enviar-notificacion", (req: Request, res: Response) => {
    const { title, body } = req.body;
  
    const payload = JSON.stringify({
      title: title || "Notificación de prueba",
      body: body || "Esta es una notificación de prueba enviada desde el backend.",
    });
  
    subscripciones.forEach((subcripcion) => {
      webPush.sendNotification(subcripcion, payload).catch((err) => {
        console.error("Error al enviar la notificación:", err);
      });
    });
  
    res.status(200).json({ message: "Notificación enviada a todos los suscriptores." });
  });





export default router;



//para probar
