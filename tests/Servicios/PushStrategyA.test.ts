import { PushNotificationStrategy } from "../../backend/src/Servicios/PushStrategyA";
import NotificacionPushService from "../../backend/src/Servicios/NotificacionesPushObserver";

// Mock del servicio de notificaciones
jest.mock("../../backend/src/Servicios/NotificacionesPushObserver", () => ({
  __esModule: true,
  default: {
    notify: jest.fn()
  }
}));

describe("PushNotificationStrategy", () => {
  it("debería invocar NotificacionPushService.notify con los datos de mesa", async () => {
    const strategy = new PushNotificationStrategy();

    const idProfesor = 123;
    const mensaje = "Nueva mesa disponible";

    await strategy.enviarNotificacion(idProfesor, mensaje);

    expect(NotificacionPushService.notify).toHaveBeenCalledWith(
      expect.objectContaining({
        profesor: idProfesor,
        materia: "Matematica Discreta",
        modalidad: "Virtual",
      })
    );
  });
});
