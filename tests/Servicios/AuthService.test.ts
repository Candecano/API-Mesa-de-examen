import { AuthService } from "../../backend/src/Servicios/AuthService";

describe("AuthService", () => {
  const authService = new AuthService();

  it("deberia retornar un token para credenciales validas", () => {
    const token = authService.login("profesor@ucp.edu.ar", "1234");
    expect(token).toBeTruthy();
  });

  it("deberia retornar null para credenciales invalidas", () => {
    const token = authService.login("otro@ucp.edu.ar", "incorrecta");
    expect(token).toBeNull();
  });
});