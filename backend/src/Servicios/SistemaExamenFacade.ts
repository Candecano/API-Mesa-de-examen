/*
// backend/Servicios/SistemaExamenFacade.ts
import { autenticarUsuario } from "../Controladores/Autenticacion";
import { obtenerMesas, crearMesa } from "../Controladores/GestiondeMesas";
import { enviarNotificacion } from "../Controladores/Notificaciones";

export class SistemaExamenFacade {
  /**
   * Simplifica el proceso de autenticación del usuario.
   * @param correo Correo del usuario
   * @param contraseña Contraseña del usuario
  async login(correo: string, contraseña: string) {
    return await autenticarUsuario({ correo, contraseña });
  }

  /**
   * Provee acceso simplificado a la lista de mesas de examen.
  
  async listarMesas() {
    return await obtenerMesas();
  }


   * Crea una nueva mesa de examen con los datos proporcionados.
   * @param mesaData Datos de la nueva mesa
  
  async nuevaMesa(mesaData: any) {
    return await crearMesa(mesaData);
  }

  /**
   * Envía una notificación push a los usuarios.
   * @param mensaje Contenido del mensaje de notificación
   
  async notificarUsuarios(mensaje: string) {
    return await enviarNotificacion(mensaje);
  } 
} */
