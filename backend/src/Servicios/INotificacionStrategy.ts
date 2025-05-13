
// 1. Strategy (interfaz): INotificacionStrategy
// 2. ConcreteStrategies: PushStrategy, EmailStrategy, etc.
// 3. Contexto: NotificacionContext

export interface INotificacionStrategy{
      enviarNotificacion(idProfesor: number, mensaje: string): Promise<void>;
}