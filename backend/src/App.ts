import express from "express";
import rutas from "./rutas";
import suscripcionesRouter from "./subscripciones";
import pool from "./Configuracion/db";
import cors from "cors";


async function testDBConnection() {
  try {
    const [rows] = await pool.query("SELECT 1");
    console.log("✅ Conexión a la base de datos exitosa.");
  } catch (error) {
    console.error("❌ Error al conectar con la base de datos:", error);
  }
}

testDBConnection();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", rutas);
app.use("/api", suscripcionesRouter); // maneja /api/subscripciones

export default app;