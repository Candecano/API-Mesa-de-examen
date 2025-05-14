import { RespuestaProfesorService } from "../../backend/src/Servicios/RespuestaProfesorService";

describe("RespuestaProfesorService", () => {
  const servicio = new RespuestaProfesorService();

  it("deberia registrar confirmacion", () => {
    servicio.confirmar("mesa1", "prof1");
    expect(servicio.obtener("prof1", "mesa1")).toBe(true);
  });

  it("deberia registrar rechazo", () => {
    servicio.rechazar("mesa2", "prof2");
    expect(servicio.obtener("prof2", "mesa2")).toBe(false);
  });
});