//Singleton-Patron de una unica instancia

//configuracion de claves vapid para las notificaciones
const webpush = require("web-push");
import webPush from "web-push";
class WebPushConfig{
private static instance: WebPushConfig;
private constructor (){
    webPush.setVapidDetails(
        "mailto:tu-email@example.com",
        process.env.CLAVE_PUBLICA || "", 
        process.env.CLAVE_PRIVADA || ""
    );


}

//metodo para devolver misma instancia
public static getinstance(): WebPushConfig {

if (!WebPushConfig.instance){
    WebPushConfig.instance= new WebPushConfig();
}
return WebPushConfig.instance;

}
  public getWebPush() {
    return webPush;
  }

}
module.exports = webpush;
export default WebPushConfig;