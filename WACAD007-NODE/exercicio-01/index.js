const fs = require('fs');
const path = require('path');

const dirPath = process.argv[2];

if (!dirPath) {
    console.log("Por favor, forneça um caminho como argumento.");
    process.exit(1);
}

fs.readdir(dirPath, (err, files) => {
    if (err) {
        console.log("Erro ao ler o diretório:", err.message);
    } else {
        console.log("Arquivos no diretório:");
        files.forEach(file => {
            console.log(file);
        });
    }
});