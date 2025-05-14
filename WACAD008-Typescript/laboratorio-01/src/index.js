function createReminder(title) {
    return {
        title: title,
        createdAt: new Date()
    };
}
var reminder1 = createReminder("Estudar TypeScript");
console.log(reminder1);
