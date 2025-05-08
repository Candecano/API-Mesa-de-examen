import webPush from "web-push";
import dotenv from "dotenv";

dotenv.config();

webPush.setVapidDetails(
    "mailto:tu-email@example.com",
    process.env.CLAVE_PUBLICA || "", 
    process.env.CLAVE_PRIVADA || ""
);
export default webPush;