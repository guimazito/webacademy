import cors from "cors"
import dotenv from "dotenv";
import { connect, model, Schema } from "mongoose";
import express, { Request, Response } from "express";

dotenv.config();

interface Reminder {
    title: string;
    createdAt: Date;
    finishUntil: Date | null;
    description: string | null;
}

const app = express();
const PORT = process.env.PORT || 4000;
const DB_BASE_URL = process.env.DB_BASE_URL || "mongodb://mongodbb:27017";

app.use(cors());
app.use(express.json());

connect(`${DB_BASE_URL}/reminderdb`, {
    maxPoolSize: 50,
    wtimeoutMS: 2500,
});

const reminderSchema = new Schema<Reminder>({
    title: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    finishUntil: { type: Date, required: false, default: null },
    description: { type: String, required: false, default: null },
}, {versionKey: false});

const ReminderModel = model<Reminder>('Reminder', reminderSchema);


app.get("/api/reminder", async (req: Request, res: Response) => {
    const reminders = await ReminderModel.find();
    console.log(reminders);
    res.status(200).json(reminders);
});


app.post("/api/reminder", async (req: Request, res: Response): Promise<void> => {
    const { title, finishUntil, description } = req.body;
    if (!title) res.status(400).json({ error: "Título é obrigatório" });
    const reminder = await ReminderModel.create({
        title,
        createdAt: new Date(),
        finishUntil: finishUntil ? new Date(finishUntil) : null,
        description: description ? description : null
    });
    if (!reminder) res.status(500).json({ error: "Erro ao criar lembrete" });
    res.status(201).json(reminder);
});


app.put("/api/reminder/:id", async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { title } = req.body;
    if (!title) res.status(400).json({ error: "Título é obrigatório" });
    const reminder = await ReminderModel.findByIdAndUpdate(id, { title, createdAt: new Date() }, { new: true });
    if (!reminder) res.status(404).json({ error: "Lembrete não encontrado" });
    res.status(200).json(reminder);
});


app.delete("/api/reminder/:id", async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const reminder = await ReminderModel.findByIdAndDelete(id);
    if (!reminder) res.status(404).json({ error: "Lembrete não encontrado" });
    res.status(200).json({ message: "Lembrete excluído com sucesso" });
});


app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

/*
    compilar o projeto: npx tsc
    executar o projeto: node build/js/index.js
    agora: npm start
    docker compose up --build
*/