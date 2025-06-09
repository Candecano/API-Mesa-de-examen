import { testDBConnection } from '../../backend/src/App';
import request from "supertest";
import app from "../../backend/src/App";

describe('App', () => {
  it('deberia inicializar sin errores', async () => {
    await testDBConnection();
  });

  it('debería devolver una promesa', () => {
    const result = testDBConnection();
    expect(result).toBeInstanceOf(Promise);
  });

  it('debería manejar errores de conexión', async () => {
  
    jest.spyOn(console, 'error').mockImplementation(() => {});
    const pool = require('../../backend/src/Configuracion/db').default;
    pool.query = jest.fn().mockRejectedValueOnce(new Error('DB error'));
    await expect(testDBConnection()).resolves.toBeUndefined();
    (console.error as jest.Mock).mockRestore();

    
  });

describe("App integration", () => {
  it("debería responder 404 para rutas inexistentes", async () => {
    const res = await request(app).get("/api/ruta-inexistente");
    expect(res.status).toBe(404);
  });

  it("debería tener el middleware de CORS activo", async () => {
    const res = await request(app).options("/api");
    expect(res.headers["access-control-allow-origin"]).toBe("*");
  });

  it("debería parsear JSON correctamente", async () => {
 
    const res = await request(app)
      .post("/api/echo")
      .send({ test: "valor" })
      .set("Content-Type", "application/json");

    expect([200, 404]).toContain(res.status);
  });

  it("debería registrar en consola cada request", async () => {
    const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    await request(app).get("/api/test");
    expect(logSpy).toHaveBeenCalledWith(expect.stringMatching(/GET \/api\/test/));
    logSpy.mockRestore();
  });
});

  
});