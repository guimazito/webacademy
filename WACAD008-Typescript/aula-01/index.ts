interface Pessoa {
    nome: string,
    idade: number
}

function somarNumeros(a: number, b: number): number {
  return a + b;
}

const numero1: number = 10;
const numero2: number = 20;

const resultado: number = somarNumeros(numero1, numero2);

const pessoa : Pessoa = {
    nome: "claudio",
    idade: 30
}

console.log(`Nome: ${pessoa.nome}`)
console.log(`Idade: ${pessoa.idade}`)
console.log(`A soma de ${numero1} e ${numero2} é: ${resultado}`);