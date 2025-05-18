interface IProduct {
    id: number;
    model: string;
    brand: string;
    price: number;
}

interface ITv extends IProduct {
    resolution: string;
    screenSize: number;
}

class Product implements IProduct {
    constructor(
        public id: number,
        public model: string,
        public brand: string,
        public price: number,
    ) {}
}

class Tv extends Product implements ITv {
    constructor(
        id: number,
        model: string,
        brand: string,
        price: number,
        public resolution: string,
        public screenSize: number,
    ) {
        super(id, model, brand, price)
    }
}

/*
    npm init -y: create package.json
    npx tsc --init: create tsconfig.json
*/