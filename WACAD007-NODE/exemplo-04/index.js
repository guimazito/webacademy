const fs = require("fs")

console.log("A")

// using readFile - Assynchronous
// fs.readFile("./html/index.html", (err, content) => {
//     if (err) console.log(err)
//     else console.log(content.toString()) 
// })

// using readFileSync - Synchronous
try {
    const content = fs.readFileSync("./html/index.html", "utf-8");
    console.log(content);
} catch (err) {
    console.error("Erro ao ler o arquivo:", err);
}

console.log("B")