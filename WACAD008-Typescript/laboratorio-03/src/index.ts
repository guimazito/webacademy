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
    quantity: number;
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
        public quantity: number,
        public image: string,
    ) {}
}

class Tv extends Product implements ITv {
    constructor(
        id: number,
        model: string,
        brand: string,
        price: number,
        quantity: number,
        image: string,
        public resolution: string,
        public screenSize: number,
    ) {
        super(id, model, brand, price, quantity, image)
    }
}

class Cellphone extends Product implements ICellphone {
    constructor(
        id: number,
        model: string,
        brand: string,
        price: number,
        quantity: number,
        image: string,
        public memory: number,
    ) {
        super(id, model, brand, price, quantity, image)
    }
}

class Bike extends Product implements IBike {
    constructor(
        id: number,
        model: string,
        brand: string,
        price: number,
        quantity: number,
        image: string,
        public rimSize: number,
    ) {
        super(id, model, brand, price, quantity, image)
    }
}

class Stock<T extends IProduct> {
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

    increaseQuantity(id: number): void {
        const item = this.items.find(item => item.id === id);
        if (item) {
            item.quantity += 1;
        }
    }

    decreaseQuantity(id: number): void {
        const item = this.items.find(item => item.id === id);
        if (item && item.quantity > 0) {
            item.quantity -= 1;
        }
    }
}

class Cart<T extends IProduct> {
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

    getTotal(): number {
        return this.items.reduce((total, item) => {
            if (item instanceof Product) {
                return total + item.price;
            }
            return total;
        }, 0);
    }
}

const stock = new Stock<Product>();
const cart = new Cart<Product>();

const myProduct1 = new Tv(1, "LG OLED", "LG", 5499, 2, "lg-oled-55", "4K", 55)
const myProduct2 = new Tv(2, "Samsung Cristal", "Samsung", 2980, 1, "samsung-cristal-60", "4K", 60)
const myProduct3 = new Tv(3, "Samsung QLED", "Samsung", 3800, 3, "samsung-qled-65", "4K", 65)
const myProduct4 = new Cellphone(4, "iPhone 14", "Apple", 5999, 4, "iphone-14", 128)
const myProduct5 = new Cellphone(5, "Motorola Edge 50", "Motorola", 2228, 2, "motorola-edge-50", 256)
const myProduct6 = new Bike(6, "Wehawk 500W", "Wehawk", 6000, 1, "wehawk-29", 29)
const myProduct7 = new Bike(7, "Caloi Vulcan", "Caloi", 1125, 3, "caloi-29", 29)
stock.add(myProduct1);
stock.add(myProduct2);
stock.add(myProduct3);
stock.add(myProduct4);
stock.add(myProduct5);
stock.add(myProduct6);
stock.add(myProduct7);

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
        stock.decreaseQuantity(item.id);
        cart.add(item);
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
        stock.increaseQuantity(item.id);
        res.status(200).json({ message: "Item removido ao carrinho" });
    } else {
        res.status(404).json({ message: "Item não encontrado" });
    }
});

app.get("/api/cart/total", (req: Request, res: Response) => {
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