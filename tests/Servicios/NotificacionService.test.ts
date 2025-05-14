import { NotificacionService } from "../../backend/src/Servicios/NotificacionService";

describe("NotificacionService", () => {
  it("debería enviar una notificación usando la estrategia", async () => {
    const mockStrategy = {
      enviarNotificacion: jest.fn().mockResolvedValue(undefined)
    };
    const servicio = new NotificacionService(mockStrategy);

    await servicio.enviarNotificacion("Título", { profesor: 1 });

    expect(mockStrategy.enviarNotificacion).toHaveBeenCalled();
  });
});
