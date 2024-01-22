import ProductDAO from "./product.dao.js";
import CartDAO from "./cart.dao.js";
import MessageDAO from "./message.dao.js";

export const getDAOs = () => {
    return {
        ProductDAO,
        CartDAO,
        MessageDAO
    }
}