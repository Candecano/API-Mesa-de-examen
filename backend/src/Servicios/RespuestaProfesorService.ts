// src/Servicios/RespuestaProfesorService.ts

interface Respuesta {
  profesorId: string;
  mesaId: string;
  acepta: boolean;
}

export class RespuestaProfesorService {
  private respuestas: Respuesta[] = [];

  confirmar(mesaId: string, profesorId: string): void {
    this.registrar(profesorId, mesaId, true);
  }

  rechazar(mesaId: string, profesorId: string): void {
    this.registrar(profesorId, mesaId, false);
  }
//guarda la respuesta del profesor
  private registrar(profesorId: string, mesaId: string, acepta: boolean): void {
    const index = this.respuestas.findIndex(
      (r) => r.profesorId === profesorId && r.mesaId === mesaId
    );
    if (index >= 0) {
      this.respuestas[index].acepta = acepta;
    } else {
      this.respuestas.push({ profesorId, mesaId, acepta });
    }
  }
//para consultar si el profesor acepta o no c true o false
  obtener(profesorId: string, mesaId: string): boolean | undefined {
    return this.respuestas.find(
      (r) => r.profesorId === profesorId && r.mesaId === mesaId
    )?.acepta;
  }
}
