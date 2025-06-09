import { AuthService } from "../../backend/src/Servicios/AuthService";

describe("AuthService", () => {
  const authService = new AuthService();

  it("deberia retornar un token para credenciales validas", () => {
    const token = authService.login("usuario101", "clave101");
    expect(token).toBeTruthy();
  });

  it("deberia retornar null para credenciales invalidas", async () => {
    const token = await authService.login("otro@ucp.edu.ar", "incorrecta");
    expect(token).toBeNull();
  });
});