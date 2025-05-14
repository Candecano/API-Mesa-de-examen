import { login } from "../../backend/src/Controladores/AuthController";
import { Request, Response } from "express";

describe("AuthController", () => {
  it("deberia devolver un token valido para credenciales correctas", () => {
    const req = { body: { email: "profesor@ucp.edu.ar", password: "1234" } } as Request;
    const json = jest.fn();
    const res = { json, status: jest.fn().mockReturnThis() } as any as Response;

    login(req, res);

    expect(json).toHaveBeenCalledWith(expect.objectContaining({ token: expect.any(String) }));
  });
});

it("deberia devolver 401 si las credenciales son invalidas", () => {
  const req = { body: { email: "invalido@ucp.edu.ar", password: "4321" } } as Request;
  const json = jest.fn();
  const status = jest.fn(() => ({ json }));
  const res = { status } as any as Response;

  login(req, res);

  expect(status).toHaveBeenCalledWith(401);
  expect(json).toHaveBeenCalledWith({ mensaje: "Credenciales invalidas" });
});