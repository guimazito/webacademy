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
const util_1 = require("./utils/util");
const express_1 = __importDefault(require("express"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
class Student {
    constructor(id, name, age, height, weight, studentClass) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.height = height;
        this.weight = weight;
        this.studentClass = studentClass;
    }
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
    constructor(id, name, students) {
        this.id = id;
        this.name = name;
        this.students = students;
        this.id = id;
        this.name = name;
        this.students = students;
    }
    getNumStudents() {
        return this.students.length;
    }
    getAverageAge() {
        const totalAge = this.students.reduce((acc, student) => acc + student.age, 0);
        return totalAge / this.students.length;
    }
    getAverageHeight() {
        const totalHeight = this.students.reduce((acc, student) => acc + student.height, 0);
        return totalHeight / this.students.length;
    }
    getAverageWeight() {
        const totalWeight = this.students.reduce((acc, student) => acc + student.weight, 0);
        return totalWeight / this.students.length;
    }
}
class ExternalAPI {
    constructor() {
        this.fetchStudents = () => __awaiter(this, void 0, void 0, function* () {
            const data = yield fetch("https://randomuser.me/api/1.4/?nat=br&results=2").then(response => {
                return response.json();
            }).catch(error => {
                if (error instanceof Error)
                    console.log(error.message);
            });
            return data;
        });
    }
}
class StudentAdapter extends Student {
    constructor(adaptee) {
        super(0, "", 0, 0, 0, undefined);
        this.adaptee = adaptee;
    }
    request() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.adaptee.fetchStudents();
            if (!data || !data.results)
                return [];
            const students = data.results.map((student, idx) => new Student(idx + 1, `${student.name.first} ${student.name.last}`, student.dob.age || 0, (0, util_1.ramdom)(1.3, 2), //height
            (0, util_1.ramdom)(40, 120), //weight
            class1));
            class1.students = students;
            return students;
        });
    }
}
// Populate first students
const students = [];
const adaptee = new ExternalAPI();
const studentsAdapter = new StudentAdapter(adaptee);
let response = [];
(() => __awaiter(void 0, void 0, void 0, function* () {
    response = yield studentsAdapter.request();
    students.push(...response);
}))();
// Populate first class
const classes = [];
const class1 = new Class(1, "Educação Física", students);
classes.push(class1);
// Students endpoints
app.get("/api/students", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json(students);
}));
app.post("/api/students", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, age, height, weight, classId } = req.body;
    if (!name || !age || !height || !weight) {
        res.status(400).json({ error: "Nome, idade, altura e peso são obrigatórios!" });
        return;
    }
    const studentClass = classes.find(c => c.id === Number(classId));
    if (!studentClass) {
        res.status(400).json({ error: "Classe não encontrada!" });
        return;
    }
    const newStudent = new Student(students.length + 1, name, Number(age), Number(height), Number(weight), studentClass);
    students.push(newStudent);
    studentClass.students.push(newStudent);
    res.status(201).json(students);
}));
app.put("/api/students/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, age, height, weight, classId } = req.body;
    const studentIndex = students.findIndex((student) => student.id === Number(id));
    if (studentIndex === -1)
        res.status(404).json({ error: "Aluno não encontrado!" });
    if (!name || !age || !height || !weight)
        res.status(400).json({ error: "Nome, idade, altura e peso são obrigatórios!" });
    const studentClass = classes.find(c => c.id === Number(classId));
    if (!studentClass) {
        res.status(400).json({ error: "Classe não encontrada!" });
        return;
    }
    students[studentIndex].name = name;
    students[studentIndex].age = age;
    students[studentIndex].height = height;
    students[studentIndex].weight = weight;
    students[studentIndex].studentClass = studentClass;
    // remove student from old class (VERIFICAR)
    const oldClassIndex = classes.findIndex(c => c.id === students[studentIndex].studentClass.id);
    if (oldClassIndex !== -1) {
        const oldClass = classes[oldClassIndex];
        const studentIndexInOldClass = oldClass.students.findIndex(s => s.id === students[studentIndex].id);
        if (studentIndexInOldClass !== -1) {
            oldClass.students.splice(studentIndexInOldClass, 1);
        }
    }
    // add student in new class
    const newClassIndex = classes.findIndex(c => c.id === studentClass.id);
    if (newClassIndex !== -1) {
        const newClass = classes[newClassIndex];
        newClass.students.push(students[studentIndex]);
    }
    res.status(200).json(students);
}));
app.delete("/api/students/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const studentIndex = students.findIndex((student) => student.id === Number(id));
    if (studentIndex === -1)
        res.status(404).json({ error: "Aluno não encontrado!" });
    res.status(200).json(students.splice(studentIndex, 1));
}));
// Classes endpoints
app.get("/api/classes", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json(classes);
}));
app.post("/api/classes", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    if (!name)
        res.status(400).json({ error: "Nome da classe é obrigatório!" });
    const newClass = new Class(classes.length + 1, name, []);
    classes.push(newClass);
    res.status(201).json(classes);
}));
app.put("/api/classes/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name } = req.body;
    const classIndex = classes.findIndex((class1) => class1.id === Number(id));
    if (classIndex === -1)
        res.status(404).json({ error: "Classe não encontrada!" });
    if (!name)
        res.status(400).json({ error: "Nome da classe é obrigatório!" });
    classes[classIndex].name = name;
    res.status(200).json(classes);
}));
app.delete("/api/classes/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const classIndex = classes.findIndex((class1) => class1.id === Number(id));
    if (classIndex === -1)
        res.status(404).json({ error: "Classe não encontrada!" });
    res.status(200).json(classes.splice(classIndex, 1));
}));
// Statistics endpoint
app.get("/api/statistics", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const stats = classes.map((studentClass) => ({
        classId: studentClass.id,
        className: studentClass.name,
        numStudents: studentClass.getNumStudents(),
        averageAge: studentClass.getAverageAge(),
        averageHeight: studentClass.getAverageHeight(),
        averageWeight: studentClass.getAverageWeight()
    }));
    res.status(200).json(stats);
}));
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
