const fs = require('fs');
const http = require('http');
const dotenv = require('dotenv');

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const path = process.argv[2];
const PORT = process.env.PORT || 3000;

if (!path) {
    console.log("Por favor, forneça um caminho como argumento.");
    process.exit(1);
}

const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" })
    fs.readdir(path, (err, files) => {
        if (err) res.writeHead(err);
        else {
            res.write("<h1>Arquivos no diretório:</h1>");
            files.forEach(file => {
                res.write(`<p>${file}</p>`);
            });
        }
        res.end();
    })
});

server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
});