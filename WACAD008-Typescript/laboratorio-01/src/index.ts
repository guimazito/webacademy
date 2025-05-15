import cors from "cors"
import { connect, model, Schema } from 'mongoose';
import express, { Request, Response } from "express";

interface Reminder {
    title: string;
    createdAt: Date;
}

const app = express();
const PORT = 3000;

const reminders: Reminder[] = [];

app.use(cors());
app.use(express.json());

const DB_BASE_URL = process.env.DB_BASE_URL || "mongodb://mongodbb:27017";

connect(`${DB_BASE_URL}/reminderdb`, {
    maxPoolSize: 50,
    wtimeoutMS: 2500,
});

const reminderSchema = new Schema<Reminder>({
    title: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
}, {versionKey: false});

const ReminderModel = model<Reminder>('Reminder', reminderSchema);

app.get("/api/reminder", async (req: Request, res: Response) => {
    const reminders = await ReminderModel.find();
    res.status(200).json(reminders);
});

app.post("/api/reminder", async (req: Request, res: Response): Promise<void> => {
    const { title } = req.body;
    if (!title) {
        res.status(400).json({ error: "Título é obrigatório" });
        return;
    }
    const reminder = await ReminderModel.create({ title, createdAt: new Date() });
    res.status(201).json(reminder);
});

app.put("/api/reminder/:id", async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { title } = req.body;
    if (!title) {
        res.status(400).json({ error: "Título é obrigatório" });
        return;
    }
    const reminder = await ReminderModel.findByIdAndUpdate(id, { title }, { new: true });
    if (!reminder) {
        res.status(404).json({ error: "Lembrete não encontrado" });
        return;
    }
    res.status(200).json(reminder);
});

app.delete("/api/reminder/:id", async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const reminder = await ReminderModel.findByIdAndDelete(id);
    if (!reminder) {
        res.status(404).json({ error: "Lembrete não encontrado" });
        return;
    }
    res.status(200).json({ message: "Lembrete excluído com sucesso" });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

/*
    compilar o projeto: npx tsc
    executar o projeto: node build/js/index.js
    agora: npm start
*/