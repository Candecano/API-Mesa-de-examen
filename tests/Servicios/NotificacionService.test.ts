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

   it("deberia propagar errores de la estrategia", async () => {
    const mockStrategy = {
      enviarNotificacion: jest.fn().mockRejectedValue(new Error("Fallo"))
    };
    const servicio = new NotificacionService(mockStrategy);

    await expect(servicio.enviarNotificacion("Titulo", { profesor: 1 }))
      .rejects
      .toThrow("Fallo");
  });

});

