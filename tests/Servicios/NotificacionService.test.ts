import { NotificacionService } from "../../backend/src/Servicios/NotificacionService";

describe("NotificacionService", () => {
  it("deberia enviar una notificacion usando la estrategia", async () => {
    const mockStrategy = {
      enviarNotificacion: jest.fn().mockResolvedValue(undefined)
    };
    const servicio = new NotificacionService(mockStrategy);

    await servicio.enviarNotificacion("Titulo", { profesor: 1 });

    expect(mockStrategy.enviarNotificacion).toHaveBeenCalled();
  });
});

