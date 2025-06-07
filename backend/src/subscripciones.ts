
interface SuscripcionPorProfesor {
  idProfesor: number;
  subscription: PushSubscription;
}

export const subscripciones: SuscripcionPorProfesor[] = [];

// nueva suscripción asociada a un profesor
export function registrarSuscripcion(idProfesor: number, subscription: PushSubscription): void {
  const yaRegistrada = subscripciones.find(
    (s) => s.idProfesor === idProfesor && JSON.stringify(s.subscription) === JSON.stringify(subscription)
  );

  if (!yaRegistrada) {
    subscripciones.push({ idProfesor, subscription });
    console.log(`📌 Suscripción registrada para profesor ${idProfesor}`);
  }
}

// todas las suscripciones asociadas a un profesor
export function obtenerSuscripcionesPorProfesor(idProfesor: number): PushSubscription[] {
  return subscripciones
    .filter((s) => s.idProfesor === idProfesor)
    .map((s) => s.subscription);
}
