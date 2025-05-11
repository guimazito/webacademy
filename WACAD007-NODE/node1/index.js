const fs = require('fs');
const url = require('url');
const http = require('http');
const dotenv = require('dotenv');
const { createLink, goHome } = require('./utils/util.js');

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const path = process.argv[2];
const PORT = process.env.PORT || 3000;

if (!path) {
    console.log("Por favor, forneça um caminho como argumento.");
    process.exit(1);
}

const server = http.createServer((req, res) => {
    if (req.url === "/") {
        res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" })
        fs.readdir(path, (err, files) => {
            if (err) res.writeHead(err);
            else {
                res.write("<h1>Arquivos no diretório:</h1>");
                files.forEach(file => {
                    res.write(`${createLink(file)}`);
                });
                res.end();
            }
        })
    } else {
        const parsedUrl = url.parse(req.url);
        const fileName = parsedUrl.path.replace("/", "");
        const filePath = `${path}/${fileName}`;
        fs.readFile(filePath, "utf-8", (err, content) => {
            if (err) {
                res.writeHead(500, { "Content-Type": "text/html;charset=utf-8" });
                res.end("Erro ao ler o arquivo.");
            } else {
                res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" })
                res.write(`${goHome()}`);
                res.end(content);
            }
        });
    }
});

server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
});