import * as repo from "../../src/Repositorios/MesaRepository";
import pool from "../backend/src/Configuracion/db";

jest.mock("../../src/Configuracion/db", () => ({
  execute: jest.fn(),
}));

describe("MesaRepository", () => {
  it("guarda una mesa correctamente", async () => {
    (pool.execute as jest.Mock).mockResolvedValueOnce([{ insertId: 1 }]);

    const result = await repo.guardarMesa(1, "Álgebra", "2025-05-25", "escrita");
    expect(pool.execute).toHaveBeenCalled();
    expect(result).toEqual({ insertId: 1 });
  });
});
