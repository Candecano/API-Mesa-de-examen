import express from "express";
const app = express();
app.use(express.json()); //transforma el body a objecto json
const port = 3000;
app.get("/ping", (_req, res) => {
  console.log("Ping received!");
  
    res.send("Pong!");
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});