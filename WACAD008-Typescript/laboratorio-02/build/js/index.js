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
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("./utils/util");
class Student {
    constructor(id, name, age, height, weight) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.height = height;
        this.weight = weight;
        this.id = id;
        this.name = name;
        this.age = age;
        this.height = height;
        this.weight = weight;
    }
}
class StudentClass {
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
            const data = yield fetch("https://randomuser.me/api/?results=2").then(response => {
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
        super(0, "", 0, 0, 0);
        this.adaptee = adaptee;
    }
    request() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.adaptee.fetchStudents();
            if (!data || !data.results)
                return [];
            return data.results.map((student, idx) => new Student(idx + 1, `${student.name.first} ${student.name.last}`, student.dob.age || 0, (0, util_1.ramdom)(1.3, 2), //height
            (0, util_1.ramdom)(40, 120) //weight
            ));
        });
    }
}
const Claudio = new Student(1, "Claudio", 33, 1.75, 80);
const Albano = new Student(2, "Albano", 32, 1.72, 75);
const ClassA = new StudentClass(1, "Class A", [Claudio, Albano]);
console.log(ClassA.getNumStudents());
console.log(ClassA.getAverageAge());
console.log(ClassA.getAverageHeight());
console.log(ClassA.getAverageWeight());
// const api = new ExternalAPI()
// api.fetchStudents().then(students => console.log(students))
const adaptee = new ExternalAPI();
const studentAdapter = new StudentAdapter(adaptee);
studentAdapter.request().then(students => console.log(students));
