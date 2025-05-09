const fs = require('fs');

console.log("A")

fs.rename("./teste4.txt", "./teste1.txt", (err) => {
    if (err) console.log("Erro ao renomear o arquivo: ", err);
    console.log("Arquivo renomeado com sucesso!");
});

console.log("B")

// criar o arquivo package.json -> npm init -y