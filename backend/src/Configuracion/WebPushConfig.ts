//Singleton-Patron de una unica instancia

import webPush from "web-push";
import dotenv from "dotenv";
dotenv.config();

class WebPushConfig {
  private static instance: WebPushConfig;

  private constructor() {
    webPush.setVapidDetails(
      "mailto:tu-correo@example.com", 
      process.env.CLAVE_PUBLICA || "",
      process.env.CLAVE_PRIVADA || ""
    );
  }

  public static getInstance(): WebPushConfig {
    if (!WebPushConfig.instance) {
      WebPushConfig.instance = new WebPushConfig();
    }
    return WebPushConfig.instance;
  }

  public getWebPush() {
    return webPush;
  }
}

export default WebPushConfig;