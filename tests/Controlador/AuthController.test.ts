import { login } from "../../backend/src/Controladores/AuthController";
import { Request, Response } from "express";

describe("AuthController", () => {
  it("debería devolver un token válido para credenciales correctas", () => {
    const req = { body: { email: "profesor@ucp.edu.ar", password: "1234" } } as Request;
    const json = jest.fn();
    const res = { json, status: jest.fn().mockReturnThis() } as any as Response;

    login(req, res);

    expect(json).toHaveBeenCalledWith(expect.objectContaining({ token: expect.any(String) }));
  });
});
