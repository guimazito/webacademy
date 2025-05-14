interface Reminder {
    title: string;
    createdAt: Date;
}

function createReminder(title: string): Reminder {
    return {
        title,
        createdAt: new Date()
    }
}
const reminder1 = createReminder("Estudar TypeScript");
console.log(reminder1);