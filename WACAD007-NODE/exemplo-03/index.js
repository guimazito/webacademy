import fs from "fs";
import http from "http";
import dotenv from "dotenv";
import strHelper from "./lib/string.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" })
  if (req.url === "/") {
    fs.readFile("./html/index.html", (err, content) => {
        if (err) res.writeHead(err);
        else res.write(strHelper.upper(content.toString()));
        res.end()
    })
    } else if (req.url === "/about" || req.url === "/ABOUT") {
        fs.readFile("./html/about.html", (err, content) => {
            if (err) res.write(err);
            else res.write(strHelper.lower(content.toString()));
            res.end()
        })
    }
});

server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
});