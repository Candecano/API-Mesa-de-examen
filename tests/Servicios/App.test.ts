import app from "../../backend/src/App";

describe("App", () => {
  it("deberi­a inicializar sin errores", () => {
    expect(app).toBeDefined();
  });
});