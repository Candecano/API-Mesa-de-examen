import express from "express";
import rutas from "./rutas";
import suscripcionesRouter from "./suscripciones";
import pool from "./Configuracion/db";
async function testDBConnection() {
  try {
    const [rows] = await pool.query("SELECT 1");
    console.log("✅ Conexión a la base de datos exitosa.");
  } catch (error) {
    console.error("❌ Error al conectar con la base de datos:", error);
  }
}
const app = express();
app.use(express.json());

app.use("/api", rutas);
app.use("/api", suscripcionesRouter); // maneja /api/subscripciones
testDBConnection();
app.listen(3000, () => {
  console.log("Servidor en http://localhost:3000");
});