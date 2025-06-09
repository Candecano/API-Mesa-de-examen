import { login } from "../../backend/src/Controladores/AuthController";
import { Request, Response } from "express";

describe("AuthController", () => {
  it("deberia devolver un token valido para credenciales correctas", async () => {
    const req = { body: { usuario: "usuario101", clave: "clave101" } } as Request;
    const json = jest.fn();
    const res = { json, status: jest.fn().mockReturnThis() } as any as Response;

    await login(req, res);

    expect(json).toHaveBeenCalledWith(expect.objectContaining({ token: expect.any(String) }));
  });
});

it("deberia devolver 401 si las credenciales son invalidas", async () => {
  const req = { body: { usuario: "nashe101", clave: "clave101" } } as Request;
  const json = jest.fn();
  const status = jest.fn(() => ({ json }));
  const res = { status } as any as Response;

  await login(req, res);

  expect(status).toHaveBeenCalledWith(401);
  expect(json).toHaveBeenCalledWith({ mensaje: "Credenciales invalidas" });
});