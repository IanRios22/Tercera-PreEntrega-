import { cartModel } from '../schemas/cart.schema.js'
import { productModel } from '../schemas/product.schema.js'
import CartDTO from '../../controllers/DTO/cart.DTO.js'
class CartDAO {
    constructor() {
        console.log('CartDAO conectado');
    }

    getAll = async () => {
        try {
            let carts = await cartModel.find().lean();
            return carts.length <= 0 ? ({ status: 500, message: 'El carrito esta vacio' }) : ({ carts })
        } catch (error) {
            throw error
        }
    }

    getCartById = async (cid) => {
        try {
            let cart = await cartModel.findById(cid).populate('products', 'product')
            return cart
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }

    createCart = async () => {
        try {
            let newCart = new CartDTO();
            const result = await cartModel.create(newCart);
            return ({ status: 200, message: 'carrito creado', payload: result })
        } catch (error) {
            throw error;
        }
    }
    addProductToCart = async (cid, pid) => {
        try {
            const thisCart = await cartModel.findById(cid)
            if (!thisCart) { return { status: 500, message: 'Cart doesnt exist, check id.' } }

            let thisProduct = await productModel.findById(pid)
            if (!thisProduct) return { status: 500, message: 'Product doesnt exist in db, check id.' }

            console.log(thisCart)

            const productIndex = thisCart.products.findIndex((item) => item.product._id.toString() === pid);
            if (productIndex !== -1) {
                thisCart.products[productIndex].quantity = parseInt(thisCart.products[productIndex].quantity) + 1
            } else {
                thisCart.products.push({ product: pid, quantity: 1 })
            }

            const updateResult = await cartModel.updateOne({ _id: cid }, thisCart, { new: true });

            if (updateResult.modifiedCount === 1) {
                return { status: 200, message: `Product added to cart`, payload: thisCart };
            } else {
                return { status: 500, message: 'Cart not found or no changes were made.' };
            }
        } catch (error) { throw error }
    }

    updateQuantity = async (cid, pid, quantity) => {
        try {
            const thisCart = await cartModel.findById(cid);
            if (!thisCart) return { status: 404, message: 'Cart not found' };

            const productIndex = thisCart.products.findIndex(item => item.product._id.toString() === pid);
            if (productIndex === -1) return { status: 500, message: 'Product does not exist in cart, check ID.' };

            const initialQuantity = thisCart.products[productIndex].quantity;
            thisCart.products[productIndex].quantity = quantity;

            const updateResult = await cartModel.findByIdAndUpdate(cid, thisCart, { new: true });

            if (updateResult.products[productIndex].quantity !== initialQuantity) {
                return { status: 200, message: 'Product quantity updated.', payload: updateResult };
            } else {
                return { status: 501, message: 'No changes were made.' };
            }
        } catch (error) {
            throw error;
        }
    };

    replaceProducts = async (cid, newProducts) => {
        try {
            const thisCart = await cartModel.findById(cid);
            if (!thisCart) return { status: 404, message: 'Cart not found' };

            const initialProducts = JSON.stringify(thisCart.products);
            thisCart.products = newProducts;

            const updateResult = await cartModel.findByIdAndUpdate(cid, thisCart, { new: true });

            //La validacion no funciona, le di vueltas pero siempre es true. No molesta pero fix needed.
            const isCartModified = JSON.stringify(newProducts) !== initialProducts
            if (isCartModified) {
                return { status: 200, message: `Complete products of ${cid} updated.`, payload: updateResult };
            } else {
                return { status: 500, message: 'Cart not found or no changes were made.' };
            }
        } catch (error) {
            throw error;
        }
    };

    deleteProductFromCart = async (cid, pid) => {
        try {
            const thisCart = await cartModel.findById(cid);
            if (!thisCart) return { status: 500, message: 'Cart does not exist, check ID.' };

            const productIndex = thisCart.products.findIndex(item => item.product._id.toString() === pid)
            if (productIndex === -1) return { status: 500, message: 'Product does not exist in cart, check ID.' }

            thisCart.products.splice(productIndex, 1);

            const updateResult = await cartModel.findByIdAndUpdate(cid, thisCart, { new: true });
            return { status: 200, message: 'Product deleted.', payload: updateResult }

        } catch (error) {
            return { status: 'error', message: `Try failed, caught error: ${error.message}` };
        }
    };

    emptyCart = async (cid) => {
        try {
            const thisCart = await cartModel.findById(cid);
            if (!thisCart) return { status: 500, message: 'Cart does not exist, check ID.' }

            thisCart.products = []

            const updateResult = await cartModel.findByIdAndUpdate(cid, thisCart, { new: true });
            return { status: 200, message: 'Cart products reseted.', payload: updateResult };


        } catch (error) { return { status: 'error', message: `Try failed, caught error: ${error.message}` } }

    }

}


export default new CartDAO();