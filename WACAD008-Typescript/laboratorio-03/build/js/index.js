"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
class Product {
    constructor(id, model, brand, price, quantity, image) {
        this.id = id;
        this.model = model;
        this.brand = brand;
        this.price = price;
        this.quantity = quantity;
        this.image = image;
    }
}
class Tv extends Product {
    constructor(id, model, brand, price, quantity, image, resolution, screenSize) {
        super(id, model, brand, price, quantity, image);
        this.resolution = resolution;
        this.screenSize = screenSize;
    }
}
class Cellphone extends Product {
    constructor(id, model, brand, price, quantity, image, memory) {
        super(id, model, brand, price, quantity, image);
        this.memory = memory;
    }
}
class Bike extends Product {
    constructor(id, model, brand, price, quantity, image, rimSize) {
        super(id, model, brand, price, quantity, image);
        this.rimSize = rimSize;
    }
}
class Stock {
    constructor() {
        this.items = [];
    }
    add(item) {
        this.items.push(item);
    }
    remove(item) {
        const index = this.items.indexOf(item);
        if (index > -1) {
            this.items.splice(index, 1);
        }
    }
    getAll() {
        return this.items;
    }
    increaseQuantity(id) {
        const item = this.items.find(item => item.id === id);
        if (item) {
            item.quantity += 1;
        }
    }
    decreaseQuantity(id) {
        const item = this.items.find(item => item.id === id);
        if (item && item.quantity > 0) {
            item.quantity -= 1;
        }
    }
}
class Cart {
    constructor() {
        this.items = [];
    }
    add(item) {
        this.items.push(item);
    }
    remove(item) {
        const index = this.items.indexOf(item);
        if (index > -1) {
            this.items.splice(index, 1);
        }
    }
    getAll() {
        return this.items;
    }
    getTotal() {
        return this.items.reduce((total, item) => {
            if (item instanceof Product) {
                return total + item.price;
            }
            return total;
        }, 0);
    }
}
const stock = new Stock();
const cart = new Cart();
const myProduct1 = new Tv(1, "LG OLED", "LG", 5499, 2, "lg-oled-55", "4K", 55);
const myProduct2 = new Tv(2, "Samsung Cristal", "Samsung", 2980, 1, "samsung-cristal-60", "4K", 60);
const myProduct3 = new Tv(3, "Samsung QLED", "Samsung", 3800, 3, "samsung-qled-65", "4K", 65);
const myProduct4 = new Cellphone(4, "iPhone 14", "Apple", 5999, 4, "iphone-14", 128);
const myProduct5 = new Cellphone(5, "Motorola Edge 50", "Motorola", 2228, 2, "motorola-edge-50", 256);
const myProduct6 = new Bike(6, "Wehawk 500W", "Wehawk", 6000, 1, "wehawk-29", 29);
const myProduct7 = new Bike(7, "Caloi Vulcan", "Caloi", 1125, 3, "caloi-29", 29);
stock.add(myProduct1);
stock.add(myProduct2);
stock.add(myProduct3);
stock.add(myProduct4);
stock.add(myProduct5);
stock.add(myProduct6);
stock.add(myProduct7);
// Stock endpoints
app.get("/api/stock", (req, res) => {
    const items = stock.getAll().sort((a, b) => a.id - b.id);
    res.json(items);
});
app.post("/api/stock", (req, res) => {
    const { model, brand, price, quantity, resolution, screenSize, memory, rimSize, type } = req.body;
    if (!model || !brand || !price || !quantity || !type) {
        res.status(400).json({ message: "Dados incompletos" });
        return;
    }
    const id = stock.getAll().length + 1;
    const image = "default";
    let newProduct;
    switch (type) {
        case "1":
            if (!resolution || !screenSize) {
                res.status(400).json({ message: "Dados de TV incompletos" });
                return;
            }
            newProduct = new Tv(id, model, brand, Number(price), Number(quantity), image, resolution, Number(screenSize));
            break;
        case "2":
            if (!memory) {
                res.status(400).json({ message: "Dados de celular incompletos" });
                return;
            }
            newProduct = new Cellphone(id, model, brand, Number(price), Number(quantity), image, Number(memory));
            break;
        case "3":
            if (!rimSize) {
                res.status(400).json({ message: "Dados de bicicleta incompletos" });
                return;
            }
            newProduct = new Bike(id, model, brand, Number(price), Number(quantity), image, Number(rimSize));
            break;
        default:
            res.status(400).json({ message: "Categoria inválida" });
            return;
    }
    stock.add(newProduct);
    res.status(201).json({ message: "Produto adicionado com sucesso", product: newProduct });
});
app.put("/api/stock/:id", (req, res) => {
    const { id } = req.params;
    const { model, brand, price, quantity, resolution, screenSize, memory, rimSize } = req.body;
    const itemIndex = stock.getAll().findIndex((item) => item.id === Number(id));
    if (itemIndex === -1) {
        res.status(404).json({ message: "Item não encontrado" });
        return;
    }
    const item = stock.getAll()[itemIndex];
    if (model)
        item.model = model;
    if (brand)
        item.brand = brand;
    if (price)
        item.price = Number(price);
    if (quantity)
        item.quantity = Number(quantity);
    if (resolution && "resolution" in item)
        item.resolution = resolution;
    if (screenSize && "screenSize" in item)
        item.screenSize = Number(screenSize);
    if (memory && "memory" in item)
        item.memory = Number(memory);
    if (rimSize && "rimSize" in item)
        item.rimSize = Number(rimSize);
    stock.remove(item);
    stock.add(item);
    res.status(200).json({ message: "Item atualizado com sucesso", item });
});
app.delete("/api/stock/:id", (req, res) => {
    const { id } = req.params;
    const itemIndex = stock.getAll().findIndex((item) => item.id === Number(id));
    if (itemIndex === -1) {
        res.status(404).json({ message: "Item não encontrado" });
        return;
    }
    const item = stock.getAll()[itemIndex];
    stock.remove(item);
    res.status(200).json({ message: "Item removido com sucesso", item });
});
// Cart endpoints
app.get("/api/cart", (req, res) => {
    const items = cart.getAll();
    res.json(items);
});
app.put("/api/cart/add", (req, res) => {
    const { id } = req.body;
    const item = stock.getAll().find((item) => item.id === id);
    if (item) {
        stock.decreaseQuantity(item.id);
        cart.add(item);
        res.status(200).json({ message: "Item adicionado ao carrinho" });
    }
    else {
        res.status(404).json({ message: "Item não encontrado" });
    }
});
app.put("/api/cart/remove", (req, res) => {
    const { id } = req.body;
    const item = cart.getAll().find((item) => item.id === id);
    if (item) {
        cart.remove(item);
        stock.increaseQuantity(item.id);
        res.status(200).json({ message: "Item removido ao carrinho" });
    }
    else {
        res.status(404).json({ message: "Item não encontrado" });
    }
});
app.get("/api/cart/total", (req, res) => {
    const total = cart.getTotal();
    res.json({ total });
});
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
/*
    npm init -y: create package.json
    npx tsc --init: create tsconfig.json
*/ 
