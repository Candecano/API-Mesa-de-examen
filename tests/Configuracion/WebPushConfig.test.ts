import WebPushConfig from "../../backend/src/Configuracion/WebPushConfig";
import webPush from "web-push";

jest.mock("web-push");

describe("WebPushConfig Singleton", () => {
  it("retorna la misma instancia siempre", () => {
    const instance1 = WebPushConfig.getinstance();
    const instance2 = WebPushConfig.getinstance();
    expect(instance1).toBe(instance2);
  });

  it("configura webPush correctamente", () => {
    WebPushConfig.getinstance();
    expect(webPush.setVapidDetails).toHaveBeenCalled();
  });

  it("exponer instancia de webPush", () => {
    const webpush = WebPushConfig.getinstance().getWebPush();
    expect(webpush).toBeDefined();
  });
});
