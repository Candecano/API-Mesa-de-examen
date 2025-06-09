import { PushNotificationStrategy } from "../../backend/src/Servicios/PushStrategyA";
import NotificacionPushService from "../../backend/src/Servicios/NotificacionesPushObserver";

jest.mock("../../backend/src/Servicios/NotificacionesPushObserver", () => ({
  __esModule: true,
  default: {
    notify: jest.fn()
  }
}));

describe("PushNotificationStrategy", () => {
  let strategy: PushNotificationStrategy;

  beforeEach(() => {
    strategy = new PushNotificationStrategy();
    jest.clearAllMocks();
  });

  it("deberia procesar correctamente un mensaje con datos completos", async () => {
    const idProfesor = 123;
    const mensaje = "Nueva mesa: {\"materia\":\"Matemáticas\",\"fecha\":\"2024-01-01\",\"modalidad\":\"Presencial\"}";

    await strategy.enviarNotificacion(idProfesor, mensaje);

    expect(NotificacionPushService.notify).toHaveBeenCalledWith({
      profesor: idProfesor,
      Materia: "Matemáticas",
      fecha: "2024-01-01",
      Modalidad: "Presencial"
    });
  });

  it("deberia manejar mensaje con datos parciales", async () => {
    const idProfesor = 123;
    const mensaje = "Nueva mesa: {\"materia\":\"Matemáticas\"}";
    const fechaActual = new Date().toISOString();

    await strategy.enviarNotificacion(idProfesor, mensaje);

    expect(NotificacionPushService.notify).toHaveBeenCalledWith({
      profesor: idProfesor,
      Materia: "Matemáticas",
      fecha: expect.any(String),
      Modalidad: "Sin modalidad"
    });
  });

  it("deberia manejar mensaje sin formato JSON valido", async () => {
    const idProfesor = 123;
    const mensaje = "Mensaje inválido";

    await strategy.enviarNotificacion(idProfesor, mensaje);

    expect(NotificacionPushService.notify).toHaveBeenCalledWith({
      profesor: idProfesor,
      Materia: "(Sin materia)",
      fecha: expect.any(String),
      Modalidad: "(Sin modalidad)"
    });
  });

  it("deberia manejar mensaje JSON malformado", async () => {
    const idProfesor = 123;
    const mensaje = "Nueva mesa: {malformado}";

    await strategy.enviarNotificacion(idProfesor, mensaje);

    expect(NotificacionPushService.notify).toHaveBeenCalledWith({
      profesor: idProfesor,
      Materia: "(Sin materia)",
      fecha: expect.any(String),
      Modalidad: "(Sin modalidad)"
    });
  });

  it("deberia manejar mensaje vacio", async () => {
    const idProfesor = 123;
    const mensaje = "";

    await strategy.enviarNotificacion(idProfesor, mensaje);

    expect(NotificacionPushService.notify).toHaveBeenCalledWith({
      profesor: idProfesor,
      Materia: "(Sin materia)",
      fecha: expect.any(String),
      Modalidad: "(Sin modalidad)"
    });
  });
})