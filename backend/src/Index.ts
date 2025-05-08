import express from "express";
import mesaRouter from "./mesa"; 
const app = express();

app.use(express.json()); // Transforma el body a objeto JSON

const port = 3000;

// Registrar el router para manejar las rutas de suscripciones y notificaciones
app.use("/api/mesa", mesaRouter);

// Estado del servidor
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});