import { getDAOs } from "../models/dao/index.dao.js";

const { ProductDAO } = getDAOs();

class ProductService {
    async getAll() {
        try {
            return await ProductDAO.getAll()
        } catch (error) {
            throw error;
        }
    }

    async getProductById(pid) {
        try {
            const product = await ProductDAO.getProductById(pid);
            if (product === null) return { status: 'error', message: 'Producto no encontrado' }
        } catch (error) {
            throw error;
        }
    }

    async updateProduct(pid, newData) {
        try {
            const response = await ProductDAO.updateProduct(pid, newData);
            if (response === null) return { status: 'error', message: 'Producto no encontrado' };
            return response;
        } catch (error) {
            throw error;
        }
    }
}

export default new ProductService();