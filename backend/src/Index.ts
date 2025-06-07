// Index.ts - Lanza servidor

import express from "express";
import cors from "cors";
import pool from "./Configuracion/db";

// Rutas
import rutas from "./rutas";
import suscripcionesRouter from "./suscripcionesRouter"; 
import mesasRoutes from "./Controladores/Mesas";

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

// Rutas principales
app.use("/api", rutas);

// Rutas específicas organizadas por funcionalidad
app.use("/api/subscripciones", suscripcionesRouter);
app.use("/api/mesas", mesasRoutes);

// Verificación de la base de datos al inicio
testDBConnection();

// Arranque del servidor
app.listen(3000, () => {
  console.log("🚀 Servidor corriendo en http://localhost:3000");
});
