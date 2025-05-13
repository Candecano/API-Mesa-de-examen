
// 1. Strategy (interfaz): INotificacionStrategy

export interface INotificacionStrategy{
      enviarNotificacion(idProfesor: number, mensaje: string): Promise<void>;
}