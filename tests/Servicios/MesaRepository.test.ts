import { MesaRepository } from "../../backend/src/Servicios/MesaRepository";
import db from "../../backend/src/Configuracion/db";

jest.mock("../../backend/src/Configuracion/db", () => ({
  __esModule: true,
  default: {
    execute: jest.fn().mockResolvedValue([{}, undefined]), // simula respuesta de la BD
  },
}));

describe("MesaRepository", () => {
  it("debería ejecutar un insert al crear una mesa", async () => {
    const repo = new MesaRepository();
    
    await repo.crearMesa({
      id: 1,
      materia: "Mat",
      fecha: "2025-01-01",
      hora: "10:00",
      modalidad: "Presencial"
    });

    expect(db.execute).toHaveBeenCalled();
  });
});


