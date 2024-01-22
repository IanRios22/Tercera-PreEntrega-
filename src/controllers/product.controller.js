import ProductService from "../service/product.service.js";
import ProductsDTO from "./DTO/product.DTO.js";

class ProductController {
    getAll = async (req, res) => {
        try {
            let allProducts = await ProductService.getAll()
            res.status(200).send({ total: allProducts.length, payload: allProducts })
        } catch (error) {
            res.status(400).send({ status: 'Error 400', message: error.message });
        }
    }

    //GET PRODUCT BY ID
    getProductById = async (req, res) => {
        try {
            const { pid } = req.params

            let foundProduct = await ProductService.getProductById(pid)
            if (!foundProduct) return { status: 'failed.', message: `Product ${pid} not found in db.` }
            res.status(200).send(foundProduct)
        } catch (error) {
            res.status(400).send({ status: 'Error 400', message: error.message });
        }
    }

    //NEW PRODUCT
    createProduct = async (req, res) => {
        try {
            const newProduct = req.body
            console.log(newProduct)
            const completeProduct = new ProductsDTO(newProduct)
            const response = await ProductService.createProduct(completeProduct)
            res.status(200).send(response)
        } catch (error) {
            res.status(400).send({ status: 'Error 400', message: error.message });
        }
    }

    //UPDATE PRODUCT
    updateProduct = async (req, res) => {
        try {
            const { pid } = req.params
            const newData = req.body

            const response = await ProductService.updateProduct(pid, newData);
            res.status(200).send(response)
        } catch (error) {
            res.status(400).send({ status: 'Error 400', message: error.message });
        }
    };

    //DELETE PRODUCT
    deleteProduct = async (req, res) => {
        try {
            const { pid } = req.params
            const response = await ProductService.deleteProduct(pid)
            res.status(200).send(response)
        } catch (error) {
            res.status(400).send({ status: 'Error 400', message: error.message });
        }
    };
}
export default new ProductController();