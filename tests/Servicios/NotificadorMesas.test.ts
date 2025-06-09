import { NotificadorMesas } from "../../backend/src/Servicios/NotificadorMesasObserver";
import { MesaInfo } from "../../backend/src/Servicios/NotificacionesPushObserver";
describe("NotificadorMesas", () => {
  let notificador: NotificadorMesas;
  let observerMock: any;

  beforeEach(() => {
    notificador = new NotificadorMesas();
    observerMock = { update: jest.fn() };
  });

  it("agrega y notifica observadores", () => {
    notificador.attach(observerMock);

    const mesa = { Materia: "Fisica", fecha: "2025-07-10", Modalidad: "oral", profesor: 1 };
    notificador.notify(mesa);

    expect(observerMock.update).toHaveBeenCalledWith(mesa);
  });

   it("debería adjuntar y notificar a un observador", () => {
    const observerMock = { update: jest.fn() };
    notificador.attach(observerMock);
    const mesa: MesaInfo = {
      profesor: 1,
      Materia: "Matemática",
      fecha: "2025-06-01",
      Modalidad: "Presencial",
    };
    notificador.notify(mesa);
    expect(observerMock.update).toHaveBeenCalledWith(mesa);
  });

  it("elimina observadores", () => {
    notificador.attach(observerMock);
    notificador.detach(observerMock);

    const mesa = { Materia: "Fisica", fecha: "2025-07-10", Modalidad: "oral", profesor: 1 };
    notificador.notify(mesa);

    expect(observerMock.update).not.toHaveBeenCalled();
  });

   it("no notificar si no hay observadores", () => {
    const mesa: MesaInfo = {
      profesor: 1,
      Materia: "inegeria de software",
      fecha: "2025-06-01",
      Modalidad: "Virtual",
    };

    expect(() => notificador.notify(mesa)).not.toThrow();
  });

  it("agrega suscripcion y notificar correctamente", () => {
  
    const subscription = { endpoint: "test-endpoint" };
    notificador.agregarSuscripcion(subscription);
  
  });

  it("no debería eliminar un observador que no existe", () => {
  const otroObserver = { update: jest.fn() };

  expect(() => notificador.detach(otroObserver)).not.toThrow();

});

it("puede adjuntar el mismo observador varias veces y notificar a todos", () => {
  notificador.attach(observerMock);
  notificador.attach(observerMock);
  const mesa: MesaInfo = {
    profesor: 2,
    Materia: "Química",
    fecha: "2025-08-01",
    Modalidad: "Presencial",
  };
  notificador.notify(mesa);

  expect(observerMock.update).toHaveBeenCalledTimes(2);
});
});
