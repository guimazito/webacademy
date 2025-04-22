// alert('oi');

let pessoa = {
    nome: 'Cláudio',
    idade: 33,
    altura: 1.75,
}

console.log(pessoa);
console.log(pessoa.nome);
console.log(pessoa['idade']);
console.log(pessoa.idade)
console.log(pessoa.altura);


document.writeln('Olá, ' + pessoa.nome + '<br>');
document.writeln('Idade, ' + pessoa.idade + '<br>');
delete pessoa.idade;
document.writeln('Idade, ' + pessoa.idade + '<br><br>');

for (let prop in pessoa) {
    document.writeln(prop + ': ' + pessoa[prop] + '<br>');
}

document.writeln('<br>')

let arr = [
    "UFAM",
    1909,
    true
]

document.writeln(arr[0] + '<br>')
document.writeln(arr[1] + '<br>')
document.writeln(arr[2] + '<br>')
document.writeln(arr.length + '<br><br>')

arr.pop()
arr.push('Manaus')
document.writeln(arr + '<br><br>')

let arr2 = [23, 10, 2, 44, 9]
document.writeln(arr2.sort() + '<br><br>')

function foo(){
    return 50;
}

foo.bar = "ICOMP";

document.writeln(typeof foo + '<br>')
document.writeln(typeof foo.bar + '<br><br>')

function imprimir(str) {
    return document.writeln((str) + '<br>');
}

imprimir('Amazonas');
imprimir('Manaus');

// var: o escopo da variável declarada com var é a função onde ela foi declarada ou o escopo global se declarada fora de uma função

// let: o escopo da variável declarada com let é o bloco onde ela foi declarada