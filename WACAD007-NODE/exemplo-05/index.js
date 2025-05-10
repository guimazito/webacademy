const fs = require("fs");

const readFile = (filename) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filename, (err, content) => {
            if (err) reject(err)
            else resolve(parseInt(content))
        })    
    })
};

console.log("A")
Promise.all([
    readFile("1.txt"),
    readFile("2.txt"),
    readFile("3.txt"),
]).then((content) => {
    console.log(content)
}).catch((err) => {
    console.log(err)
})
console.log("B")
console.log("C")