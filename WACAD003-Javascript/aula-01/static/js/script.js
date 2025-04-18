alert('Método Externo');

// Tipagem Dinâmica
let i = 1;
console.log(i);
console.log(typeof i+'\n');

i = 'a string';
console.log(i);
console.log(typeof i+'\n');

i = new Date();
console.log(i);
console.log(typeof i);

let firstName = 'Claudio';
let lastName = 'Guimaraes';
console.log(`Meu nome é ${firstName} ${lastName}`);

let a = "25";
let b = 5;
console.log(a==b); // Não compara o tipo
console.log(a===b); // Compara o tipo

document.writeln('<h1>Inserindo com document.writeln</h1>');