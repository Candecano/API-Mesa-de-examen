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

    it("maneja multiples profesores y mesas", () => {
    servicio.confirmar("mesa1", "prof1");
    servicio.rechazar("mesa2", "prof1");
    servicio.confirmar("mesa1", "prof2");
    expect(servicio.obtener("prof1", "mesa1")).toBe(true);
    expect(servicio.obtener("prof1", "mesa2")).toBe(false);
    expect(servicio.obtener("prof2", "mesa1")).toBe(true);
   
  });

   it("sobrescribe respuesta si se rechaza después de confirmar", () => {
    servicio.confirmar("mesa4", "prof4");
    servicio.rechazar("mesa4", "prof4");
    expect(servicio.obtener("prof4", "mesa4")).toBe(false);
  });

  it("deberia manejar confirmaciones y rechazos independientes entre profesores", () => {
  servicio.confirmar("mesa6", "prof6");
  servicio.rechazar("mesa6", "prof7");
  expect(servicio.obtener("prof6", "mesa6")).toBe(true);
  expect(servicio.obtener("prof7", "mesa6")).toBe(false);
});
});
