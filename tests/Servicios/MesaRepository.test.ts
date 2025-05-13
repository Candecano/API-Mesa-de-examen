import { MesaRepository } from "../../backend/src/Servicios/MesaRepository";

jest.mock("../../backend/src/Configuracion/db", () => ({
  default: { execute: jest.fn() }
}));

describe("MesaRepository", () => {
  it("debería ejecutar un insert al crear una mesa", async () => {
    const repo = new MesaRepository();
    await repo.crearMesa({ id: 1, materia: "Mat", fecha: "2025-01-01", hora: "10:00", modalidad: "Presencial" });
    const db = (await import("../../backend/src/Configuracion/db")).default;
    expect(db.execute).toHaveBeenCalled();
  });
});

