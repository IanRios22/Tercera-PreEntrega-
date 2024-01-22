import { productModel } from "../schemas/product.schema.js";

export default class ProductDAO {
    constructor() {
        console.log('Productos del DAO conectados');
    }

    //obtener todo con el getALL
    async getAll() {
        try {
            const products = await productModel.find().lean();
        } catch (error) {
            throw error;
        }
    }

    //Actualizar productos
    updateProduct = async (pid, updatedFields) => {
        try {
            let findProduct = await productModel.findById(pid);
            if (!findProduct) return null;
            const updateProduct = await productModel.findByIdAndUpdate(pid, updatedFields, { new: true });
            return updateProduct
        } catch (error) {

        }
    }

    //Obtener producto con el ID
    getProductById = async (pid) => {
        try {
            let findProduct = await productModel.findById(pid);
            if (!findProduct) return null;
            return findProduct;
        } catch (error) {
            throw error;
        }
    }

    //crear producto
    createProduct = async (product) => {
        try {
            await productModel.create(proproductduct);
            return ({ status: 200, message: 'Producto agregado', payload: product })
        } catch (error) {
            throw error;
        }
    }

    //Eliminar producto
    deleteProduct = async (pid) => {
        try {
            const result = await productModel.deleteOne({ _id: pid });
            if (result.deletedCount === 0) {
                return null;
            }
            return { status: 'Success.', message: `Producto ${pid} eliminado.` };
        } catch (error) {
            return { status: 'Error', message: error.message }
        }
    }
}