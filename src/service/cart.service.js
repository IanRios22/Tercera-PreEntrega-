import { getDAOs } from "../models/dao/index.dao.js";

const { CartDAO } = getDAOs();

class CartService {
    async getAll() {
        try {
            return await CartDAO.getAll()
        } catch (error) {
            throw error;
        }
    }
    async getCartById(cid) {
        try {
            const response = await CartDAO.getCartById(cid)
            return response === null ? { status: 404, message: 'Cart id not found' } : response
        } catch (error) {
            throw error;
        }
    }

    async createCart() {
        try {
            return await CartDAO.createCart()
        } catch (error) {
            throw error;
        }
    }
    async addProductToCart(cid, pid) {
        try {
            return await CartDAO.addProductToCart(cid, pid)
        } catch (error) {
            throw error;
        }
    }
    async updateQuantity(cid, pid, quantityNumber) {
        try {
            return await CartDAO.updateQuantity(cid, pid, quantityNumber)
        } catch (error) {
            throw error;
        }
    }
    async replaceProducts(cid, newProducts) {
        try {
            return await CartDAO.replaceProducts(cid, newProducts)
        } catch (error) {
            throw error
        }
    }
    async deleteProductFromCart(cid, pid) {
        try {
            return await CartDAO.deleteProductFromCart(cid, pid)
        } catch (error) {
            throw error
        }
    }
    async emptyCart(cid) {
        try {
            return await CartDAO.emptyCart(cid)
        } catch (error) {
            throw error
        }
    }
}

export default new CartService();