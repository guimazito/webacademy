import { ramdom } from "./utils/util";

class Student {

    constructor(
        public id: number,
        public name: string,
        public age: number,
        public height: number,
        public weight: number
    ) {
        this.id = id
        this.name = name
        this.age = age
        this.height = height
        this.weight = weight
    }
}

class StudentClass {

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
            "https://randomuser.me/api/?results=2"
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
        super(0, "", 0, 0, 0);
        this.adaptee = adaptee;
    }

    public async request(): Promise<Student[]> {
        const data = await this.adaptee.fetchStudents();

        if (!data || !data.results) return [];

        
        return data.results.map((student: any, idx: number) =>
            new Student(
                idx + 1,
                `${student.name.first} ${student.name.last}`,
                student.dob.age || 0,
                ramdom(1.3, 2), //height
                ramdom(40, 120) //weight
            )
        );
    }
}

const Claudio = new Student(1, "Claudio", 33, 1.75, 80)
const Albano = new Student(2, "Albano", 32, 1.72, 75)
const ClassA = new StudentClass(1, "Class A", [Claudio, Albano])
console.log(ClassA.getNumStudents())
console.log(ClassA.getAverageAge())
console.log(ClassA.getAverageHeight())
console.log(ClassA.getAverageWeight())
// const api = new ExternalAPI()
// api.fetchStudents().then(students => console.log(students))
const adaptee = new ExternalAPI();
const studentAdapter = new StudentAdapter(adaptee);
studentAdapter.request().then(students => console.log(students));
