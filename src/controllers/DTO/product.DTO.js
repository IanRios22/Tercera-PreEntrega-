import { generateCode } from "../../utils.js";

export default class ProductsDTO {
    constructor() {
        if (!this.isValidProduct(product)) {
            throw new Error("Producto INVALIDO!!");
        }

        this.title = product.title;
        this.description = product.description;
        this.category = product.category;
        this.code = generateCode();
        this.price = product.price;
        this.stock = product.stock;
        this.thumbnail = product.thumbnail;
    }
    isValidProduct(product) {
        return (
            product && typeof product.title === "string" &&
            typeof product.description === 'string' &&
            typeof product.category === 'string' &&
            typeof product.price === 'number' &&
            typeof product.stock === 'number' &&
            typeof product.thumbnail === 'string'
        )
    }
}