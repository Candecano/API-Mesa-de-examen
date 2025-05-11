// src/services/RespuestaProfesorService.ts

interface Respuesta {
  profesorId: string;
  mesaId: string;
  acepta: boolean;
}

export class RespuestaProfesorService {
  private respuestas: Respuesta[] = [];

  registrar(profesorId: string, mesaId: string, acepta: boolean): void {
    const index = this.respuestas.findIndex(
      (r) => r.profesorId === profesorId && r.mesaId === mesaId
    );
    if (index >= 0) {
      this.respuestas[index].acepta = acepta;
    } else {
      this.respuestas.push({ profesorId, mesaId, acepta });
    }
  }

  obtener(profesorId: string, mesaId: string): boolean | undefined {
    return this.respuestas.find(
      (r) => r.profesorId === profesorId && r.mesaId === mesaId
    )?.acepta;
  }
}
