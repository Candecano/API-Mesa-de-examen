"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json()); //transforma el body a objecto json
const port = 3000;
app.get("/ping", (_req, res) => {
    console.log("Ping received!");
    res.send("Pong!");
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
