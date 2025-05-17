import cors from "cors"
import dotenv from "dotenv";
import { ramdom } from "./utils/util";
import express, { Request, Response } from "express";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

class Student {

    constructor(
        public id: number,
        public name: string,
        public age: number,
        public height: number,
        public weight: number,
        public studentClass: Class
    ) {}

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            age: this.age,
            height: this.height,
            weight: this.weight,
            class: {
                id: this.studentClass.id,
                name: this.studentClass.name
            }
        };
    }
}

class Class {

    constructor(
        public id: number,
        public name: string,
        public students: Student[]
    ) {
        this.id = id
        this.name = name
        this.students = students
    }

    getNumStudents(): number {
        return this.students.length
    }

    getAverageAge(): number {
        const totalAge = this.students.reduce((acc, student) => acc + student.age, 0)
        return totalAge / this.students.length
    }

    getAverageHeight(): number {
        const totalHeight = this.students.reduce((acc, student) => acc + student.height, 0)
        return totalHeight / this.students.length
    }

    getAverageWeight(): number {
        const totalWeight = this.students.reduce((acc, student) => acc + student.weight, 0)
        return totalWeight / this.students.length
    }
}

class ExternalAPI {    

    public fetchStudents = async (): Promise<{ results: any[] }> => {
    
        const data = await fetch(
            "https://randomuser.me/api/1.4/?nat=br&results=2",
        ).then(response => {
            return response.json()
        }).catch(error => {
            if (error instanceof Error) console.log(error.message)
        })
        return data
    }
}

class StudentAdapter extends Student {

    /*
        https://refactoring.guru/design-patterns/adapter/typescript/example#lang-features
    */

    private adaptee: ExternalAPI;
    
    constructor(
        adaptee: ExternalAPI
    ) {
        super(0, "", 0, 0, 0, undefined as unknown as Class);
        this.adaptee = adaptee;
    }

    public async request(): Promise<Student[]> {
        const data = await this.adaptee.fetchStudents();

        if (!data || !data.results) return [];

        const students = data.results.map((student: any, idx: number) =>
            new Student(
                idx + 1,
                `${student.name.first} ${student.name.last}`,
                student.dob.age || 0,
                ramdom(1.3, 2), //height
                ramdom(40, 120), //weight
                class1
            )
        );
        
        class1.students = students;

        return students;
    }
}

// Populate first students
const students: Student[] = [];
const adaptee = new ExternalAPI();
const studentsAdapter = new StudentAdapter(adaptee);

let response: Student[] = [];
(async () => {
    response = await studentsAdapter.request();
    students.push(...response);
})();

// Populate first class
const classes: Class[] = [];
const class1 = new Class(1, "Educação Física", students);
classes.push(class1);

// Students endpoints
app.get("/api/students", async (req: Request, res: Response) => {
    res.status(200).json(students);
});

app.post("/api/students", async (req: Request, res: Response) => {
    const { name, age, height, weight } = req.body;
    const newStudent = new Student(
        students.length + 1,
        name,
        age,
        height,
        weight,
        new Class( // MODIFICAR PARA CLASSE DINAMICA
            1,
            "Educação Física",
            []
        )
    )
    students.push(newStudent);

    res.status(201).json(students);
});

app.delete("/api/students/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    const studentIndex = students.findIndex((student) => student.id === Number(id));
    if (studentIndex === -1) res.status(404).json({ error: "Aluno não encontrado!" })
    res.status(200).json(students.splice(studentIndex, 1));
});

// Classes endpoints
app.get("/api/classes", async (req: Request, res: Response) => {
    res.status(200).json(classes);
});

app.post("/api/classes", async (req: Request, res: Response) => {
    const { name } = req.body;
    if (!name) res.status(400).json({ error: "Nome da classe é obrigatório!" });    
    const newClass = new Class(
        classes.length + 1,
        name,
        []
    )
    classes.push(newClass);
    
    res.status(201).json(classes);
});

app.put("/api/classes/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name } = req.body;
    const classIndex = classes.findIndex((class1) => class1.id === Number(id));
    if (classIndex === -1) res.status(404).json({ error: "Classe não encontrada!" })
    if (!name) res.status(400).json({ error: "Nome da classe é obrigatório!" });
    classes[classIndex].name = name;
    res.status(200).json(classes);
});

app.delete("/api/classes/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    const classIndex = classes.findIndex((class1) => class1.id === Number(id));
    if (classIndex === -1) res.status(404).json({ error: "Classe não encontrada!" })
    res.status(200).json(classes.splice(classIndex, 1));
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});