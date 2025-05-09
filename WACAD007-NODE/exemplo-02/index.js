const http = require('http');
const dotenv = require('dotenv');

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
console.log(process.env);

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf8' })
    res.write('<h1>Web Academy</h1>');
    res.end();
});

server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

// npm start
// npm run start:prod