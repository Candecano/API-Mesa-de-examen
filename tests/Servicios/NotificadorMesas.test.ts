import { NotificadorMesas } from "../../backend/src/Servicios/NotificadorMesasObserver";

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

  it("elimina observadores", () => {
    notificador.attach(observerMock);
    notificador.detach(observerMock);

    const mesa = { Materia: "Fisica", fecha: "2025-07-10", Modalidad: "oral", profesor: 1 };
    notificador.notify(mesa);

    expect(observerMock.update).not.toHaveBeenCalled();
  });
});
