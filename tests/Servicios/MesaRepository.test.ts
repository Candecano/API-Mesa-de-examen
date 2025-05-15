import { MesaRepository } from "../../backend/src/Servicios/MesaRepository";
import db from "../../backend/src/Configuracion/db";

jest.mock("../../backend/src/Configuracion/db", () => ({
  __esModule: true,
  default: {
    execute: jest.fn().mockResolvedValue([{}, undefined]), // simula respuesta de la BD
  },
}));

describe("MesaRepository", () => {
  it("deberia ejecutar un insert al crear una mesa", async () => {
    const repo = new MesaRepository();
    
    await repo.crearMesa({
      id: 1,
      Materia: "Mat",
      fecha: "2025-01-01",
      Modalidad: "Presencial"
    });

    expect(db.execute).toHaveBeenCalled();
  });
});


it("deberia lanzar un error si falla la insercion", async () => {
  const repo = new MesaRepository();
  (db.execute as jest.Mock).mockRejectedValueOnce(new Error("Error en BD"));

  await expect(repo.crearMesa({
    id: 2,
    Materia: "Algoritmos",
    fecha: "2025-05-20",
    Modalidad: "Digital"
  })).rejects.toThrow("Error en BD");
});