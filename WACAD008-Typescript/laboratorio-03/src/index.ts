import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response } from "express";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

interface IProduct {
    id: number;
    model: string;
    brand: string;
    price: number;
    image: string;
}

interface ITv extends IProduct {
    resolution: string;
    screenSize: number;
}

interface ICellphone extends IProduct {
    memory: number;
}

interface IBike extends IProduct {
    rimSize: number;
}

class Product implements IProduct {
    constructor(
        public id: number,
        public model: string,
        public brand: string,
        public price: number,
        public image: string,
    ) {}
}

class Tv extends Product implements ITv {
    constructor(
        id: number,
        model: string,
        brand: string,
        price: number,
        image: string,
        public resolution: string,
        public screenSize: number,
    ) {
        super(id, model, brand, price, image)
    }
}

class Cellphone extends Product implements ICellphone {
    constructor(
        id: number,
        model: string,
        brand: string,
        price: number,
        image: string,
        public memory: number,
    ) {
        super(id, model, brand, price, image)
    }
}

class Bike extends Product implements IBike {
    constructor(
        id: number,
        model: string,
        brand: string,
        price: number,
        image: string,
        public rimSize: number,
    ) {
        super(id, model, brand, price, image)
    }
}

class Stock<T> {
    private items: T[] = [];

    add(item: T): void {
        this.items.push(item);
    }
    
    remove(item: T): void {
        const index = this.items.indexOf(item);
        if (index > -1) {
            this.items.splice(index, 1);
        }
    }

    getAll(): T[] {
        return this.items;
    }
}

class Cart<T> {
    private items: T[] = [];

    add(item: T): void {
        this.items.push(item);
    }

    remove(item: T): void {
        const index = this.items.indexOf(item);
        if (index > -1) {
            this.items.splice(index, 1);
        }
    }

    getAll(): T[] {
        return this.items;
    }
}

const stock = new Stock<Product>();
const cart = new Cart<Product>();

const myProduct1 = new Tv(1, "LG OLED", "LG", 5499, "lg-oled-55", "4K", 55)
const myProduct2 = new Tv(2, "Samsung Cristal", "Samsung", 2980, "samsung-cristal-60", "4K", 60)
const myProduct3 = new Tv(3, "Samsung QLED", "Samsung", 3800, "samsung-qled-65", "4K", 65)
const myProduct4 = new Cellphone(4, "iPhone 14", "Apple", 5999, "iphone-14", 128)
const myProduct5 = new Cellphone(5, "Motorola Edge 50", "Motorola", 2228, "motorola-edge-50", 256)
const myProduct6 = new Bike(6, "Bicicleta Elétrica 500w", "Wehawk", 6000, "wehawk-29", 29)
const myProduct7 = new Bike(7, "Caloi Vulcan", "Caloi", 1125, "caloi-29", 29)
stock.add(myProduct1);
stock.add(myProduct2);
stock.add(myProduct4);
stock.add(myProduct5);
stock.add(myProduct6);
stock.add(myProduct7);
cart.add(myProduct3);

// Stock endpoints
app.get("/api/stock", (req: Request, res: Response) => {
    const items = stock.getAll();
    res.json(items);
});

// Cart endpoints
app.get("/api/cart", (req: Request, res: Response) => {
    const items = cart.getAll();
    res.json(items);
});

app.put("/api/cart/add", (req: Request, res: Response) => {
    const { id } = req.body;
    const item = stock.getAll().find((item) => item.id === id);
    if (item) {
        cart.add(item);
        stock.remove(item);
        res.status(200).json({ message: "Item adicionado ao carrinho" });
    } else {
        res.status(404).json({ message: "Item não encontrado" });
    }
});

app.put("/api/cart/remove", (req: Request, res: Response) => {
    const { id } = req.body;
    const item = cart.getAll().find((item) => item.id === id);
    if (item) {
        cart.remove(item);
        stock.add(item);
        res.status(200).json({ message: "Item removido ao carrinho" });
    } else {
        res.status(404).json({ message: "Item não encontrado" });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

/*
    npm init -y: create package.json
    npx tsc --init: create tsconfig.json
*/