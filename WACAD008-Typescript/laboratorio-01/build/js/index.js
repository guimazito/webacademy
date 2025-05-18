"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = require("mongoose");
const express_1 = __importDefault(require("express"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
const DB_BASE_URL = process.env.DB_BASE_URL || "mongodb://mongodbb:27017";
app.use((0, cors_1.default)());
app.use(express_1.default.json());
(0, mongoose_1.connect)(`${DB_BASE_URL}/reminderdb`, {
    maxPoolSize: 50,
    wtimeoutMS: 2500,
});
const reminderSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    finishUntil: { type: Date, required: true },
    description: { type: String, required: false },
}, { versionKey: false });
const ReminderModel = (0, mongoose_1.model)('Reminder', reminderSchema);
app.get("/api/reminder", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reminders = yield ReminderModel.find();
    console.log(reminders);
    res.status(200).json(reminders);
}));
app.post("/api/reminder", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, finishUntil, description } = req.body;
    if (!title)
        res.status(400).json({ error: "Título é obrigatório" });
    const reminder = yield ReminderModel.create({
        title,
        createdAt: new Date(),
        finishUntil: new Date(finishUntil),
        description: null
    });
    if (!reminder)
        res.status(500).json({ error: "Erro ao criar lembrete" });
    res.status(201).json(reminder);
}));
app.put("/api/reminder/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title } = req.body;
    if (!title)
        res.status(400).json({ error: "Título é obrigatório" });
    const reminder = yield ReminderModel.findByIdAndUpdate(id, { title, createdAt: new Date() }, { new: true });
    if (!reminder)
        res.status(404).json({ error: "Lembrete não encontrado" });
    res.status(200).json(reminder);
}));
app.delete("/api/reminder/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const reminder = yield ReminderModel.findByIdAndDelete(id);
    if (!reminder)
        res.status(404).json({ error: "Lembrete não encontrado" });
    res.status(200).json({ message: "Lembrete excluído com sucesso" });
}));
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
/*
    compilar o projeto: npx tsc
    executar o projeto: node build/js/index.js
    agora: npm start
    docker compose up --build
*/ 
