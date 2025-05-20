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
    constructor(id, model, brand, price, image) {
        this.id = id;
        this.model = model;
        this.brand = brand;
        this.price = price;
        this.image = image;
    }
}
class Tv extends Product {
    constructor(id, model, brand, price, image, resolution, screenSize) {
        super(id, model, brand, price, image);
        this.resolution = resolution;
        this.screenSize = screenSize;
    }
}
class Cellphone extends Product {
    constructor(id, model, brand, price, image, memory) {
        super(id, model, brand, price, image);
        this.memory = memory;
    }
}
class Bike extends Product {
    constructor(id, model, brand, price, image, rimSize) {
        super(id, model, brand, price, image);
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
const myProduct1 = new Tv(1, "LG OLED", "LG", 5499, "lg-oled-55", "4K", 55);
const myProduct2 = new Tv(2, "Samsung Cristal", "Samsung", 2980, "samsung-cristal-60", "4K", 60);
const myProduct3 = new Tv(3, "Samsung QLED", "Samsung", 3800, "samsung-qled-65", "4K", 65);
const myProduct4 = new Cellphone(4, "iPhone 14", "Apple", 5999, "iphone-14", 128);
const myProduct5 = new Cellphone(5, "Motorola Edge 50", "Motorola", 2228, "motorola-edge-50", 256);
const myProduct6 = new Bike(6, "Wehawk 500W", "Wehawk", 6000, "wehawk-29", 29);
const myProduct7 = new Bike(7, "Caloi Vulcan", "Caloi", 1125, "caloi-29", 29);
stock.add(myProduct1);
stock.add(myProduct2);
stock.add(myProduct4);
stock.add(myProduct5);
stock.add(myProduct6);
stock.add(myProduct7);
cart.add(myProduct3);
// Stock endpoints
app.get("/api/stock", (req, res) => {
    const items = stock.getAll();
    res.json(items);
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
        cart.add(item);
        stock.remove(item);
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
        stock.add(item);
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
