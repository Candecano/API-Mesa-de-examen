import { SistemaExamenFacade } from "../../backend/src/Servicios/SistemaExamenFacade";
import { MesaRepository } from "../../backend/src/Servicios/MesaRepository";
import { RespuestaProfesorService } from "../../backend/src/Servicios/RespuestaProfesorService";
import { NotificacionService } from "../../backend/src/Servicios/NotificacionService";

describe("SistemaExamenFacade", () => {
  const repo = { crearMesa: jest.fn() } as any as MesaRepository;
  const respuestaService = { confirmar: jest.fn(), rechazar: jest.fn() } as any as RespuestaProfesorService;
  const notificador = { enviarNotificacion: jest.fn() } as any as NotificacionService;
  const facade = new SistemaExamenFacade(repo, respuestaService, notificador);

  it("deberia asignar una mesa", async () => {
    await facade.asignarMesa({ id: 1, materia: "Fisica", fecha: "2025-07-10", hora: "10:00", modalidad: "Virtual" });
    expect(repo.crearMesa).toHaveBeenCalled();
    expect(notificador.enviarNotificacion).toHaveBeenCalled();
  });

  it("deberia confirmar mesa", () => {
    facade.confirmarMesa("m1", "p1");
    expect(respuestaService.confirmar).toHaveBeenCalled();
    expect(notificador.enviarNotificacion).toHaveBeenCalled();
  });

  it("deberia rechazar mesa", () => {
    facade.rechazarMesa("m2", "p2");
    expect(respuestaService.rechazar).toHaveBeenCalled();
    expect(notificador.enviarNotificacion).toHaveBeenCalled();
  });
});
