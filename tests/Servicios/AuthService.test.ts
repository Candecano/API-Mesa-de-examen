import { AuthService } from "../../backend/src/Servicios/AuthService";

describe("AuthService", () => {
  const authService = new AuthService();

  it("debería retornar un token para credenciales válidas", () => {
    const token = authService.login("profesor@ucp.edu.ar", "1234");
    expect(token).toBeTruthy();
  });

  it("debería retornar null para credenciales inválidas", () => {
    const token = authService.login("otro@ucp.edu.ar", "incorrecta");
    expect(token).toBeNull();
  });
});