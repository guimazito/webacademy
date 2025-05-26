const dotenv = require('dotenv')
const express = require ('express')

dotenv.config()
const app = express()

const PORT = process.env.PORT || 3333;

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/about", (req, res) => {
    res.send("About");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});