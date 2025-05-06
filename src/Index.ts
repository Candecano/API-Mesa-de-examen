import express from "express";
import app from "./app";


app.use(express.json()); //transforma el body a objecto json
const port = 3000;


//estado del servidor

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

