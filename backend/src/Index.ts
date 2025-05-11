import express from "express";
import rutas from "./rutas";
import suscripcionesRouter from "./suscripciones";

const app = express();
app.use(express.json());

app.use("/api", rutas);
app.use("/api", suscripcionesRouter); // maneja /api/subscripciones

app.listen(3000, () => {
  console.log("Servidor en http://localhost:3000");
});