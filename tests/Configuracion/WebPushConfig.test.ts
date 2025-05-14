import webpush from "web-push";

describe("Configuración de WebPush", () => {
  it("debería tener claves VAPID definidas", () => {
    expect(process.env.VAPID_PUBLIC_KEY).toBeDefined();
    expect(process.env.VAPID_PRIVATE_KEY).toBeDefined();
  });
});