function somarNumeros(a, b) {
    return a + b;
}
var numero1 = 10;
var numero2 = 20;
var resultado = somarNumeros(numero1, numero2);
var pessoa = {
    nome: "claudio",
    idade: 30
};
console.log("Nome: ".concat(pessoa.nome));
console.log("Idade: ".concat(pessoa.idade));
console.log("A soma de ".concat(numero1, " e ").concat(numero2, " \u00E9: ").concat(resultado));
