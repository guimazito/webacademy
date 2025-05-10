const fs = require("fs");

const readFile = (filename) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filename, (err, content) => {
            if (err) reject(err)
            else resolve(parseInt(content))
        })    
    })
};

async function soma() {
    const c1 = await readFile("1.txt")
    const c2 = await readFile("2.txt")
    const c3 = await readFile("3.txt")
    return c1 + c2 + c3
}

console.log("A")
soma().then((c => console.log(c)))
console.log("B")