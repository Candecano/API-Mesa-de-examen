import { NotificadorMesas } from "../../backend/src/Servicios/NotificadorMesas";

describe("NotificadorMesas", () => {
  let notificador: NotificadorMesas;
  let observerMock: any;

  beforeEach(() => {
    notificador = new NotificadorMesas();
    observerMock = { update: jest.fn() };
  });

  it("agrega y notifica observadores", () => {
    notificador.attach(observerMock);

    const mesa = { materia: "Física", fecha: "2025-07-10", modalidad: "oral", profesor: 1 };
    notificador.notify(mesa);

    expect(observerMock.update).toHaveBeenCalledWith(mesa);
  });

  it("elimina observadores", () => {
    notificador.attach(observerMock);
    notificador.detach(observerMock);

    const mesa = { materia: "Física", fecha: "2025-07-10", modalidad: "oral", profesor: 1 };
    notificador.notify(mesa);

    expect(observerMock.update).not.toHaveBeenCalled();
  });
});
