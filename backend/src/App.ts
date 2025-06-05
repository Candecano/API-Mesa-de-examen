//Confi app e

import express from "express";
import rutas from "./rutas";
import suscripcionesRouter from "./subscripciones";
import pool from "./Configuracion/db";
import cors from "cors";


export async function testDBConnection() {
  try {
    const [rows] = await pool.query("SELECT 1");
    console.log("Conexion a la base de datos exitosa.");
  } catch (error) {
    console.error("Error al conectar con la base de datos:", error);
  }
}

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log(`📥 ${req.method} ${req.url}`);
  next();
});
app.use("/api", rutas);
app.use("/api", suscripcionesRouter); 

export default app;