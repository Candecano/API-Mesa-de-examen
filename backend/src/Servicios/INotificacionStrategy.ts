
// 1. Strategy (interfaz): INotificacionStrategy
//Strategy define como enviar notificaciones
//estrategia
export interface INotificacionStrategy{
      enviarNotificacion(idProfesor: number, mensaje: string): Promise<void>;
}