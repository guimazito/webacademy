"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const PORT = 3000;
const reminders = [];
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/api/reminder", (req, res) => {
    const { title } = req.query;
    console.log(title);
    res.status(200).json(reminders);
});
app.post("/api/reminder", (req, res) => {
    const { title } = req.body;
    console.log(title);
    const reminder = {
        title,
        createdAt: new Date()
    };
    reminders.push(reminder);
    res.status(201).json(reminder);
});
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
/*
    compilar o projeto: npx tsc
    executar o projeto: node build/js/index.js
    agora: npm start
*/ 
