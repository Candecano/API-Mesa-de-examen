//lanza servidor
import express from "express";
import rutas from "./rutas";
import suscripcionesRouter from "./subscripciones";
import pool from "./Configuracion/db";
import cors from "cors";
async function testDBConnection() {
  try {
    const [rows] = await pool.query("SELECT 1");
    console.log(" Conexion a la base de datos exitosa.");
  } catch (error) {
    console.error(" Error al conectar con la base de datos:", error);
  }
}
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", rutas);
app.use("/api", suscripcionesRouter); 
testDBConnection();
app.listen(3000, () => {
  console.log("Servidor en http://localhost:3000");
});