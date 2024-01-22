import productService from "./product.service.js";
import cartService from "./cart.service.js";
import TicketDTO from "../controllers/DTO/ticket.DTO.js";
import ticketDao from "../models/dao/ticket.dao.js";

class TicketService {
    getAll = async (user, cid) => {
        const response = await ticketDao.getAll();
        return response
    }

    createTicket = async (user, cid) => {
        try {
            // Verificar si user es undefined o null
            if (!user || typeof user !== 'object') {
                return { error: 'Usuario no válido' };
            }

            // Verificar si user tiene la propiedad cartId
            if (!user.cartId || user.cartId !== cid) {
                return { error: 'Cart Id y cid no coinciden' };
            }
            const thisCart = await cartService.getCartById(cid);
            if (!thisCart) return { error: 'Cart no encontrada' };

            const cartFilterOurStock = [];
            const productsForTicket = [];
            let totalPrice = 0;
            for (const { product, quantity } of thisCart.products) {
                if (product.stock < quantity) {
                    cartFilterOurStock.push({
                        product: product,
                        quantity: quantity
                    })
                } else {
                    const stockRestante = product.stock - quantity;
                    totalPrice += product.price * quantity;

                    await productService.updateProduct(product._id, { stock: stockRestante });

                    productsForTicket.push({
                        product: {
                            _id: product._id,
                            title: product.title,
                            price: product.price,
                        },
                        quantity,
                    })
                }
            }

            if (productsForTicket.length === 0) {
                return {
                    status: 204,
                    warning: 'no hay contenido',
                    message: 'No se pudo ejecutar la compra'
                }
            } else {
                thisCart.products = cartFilterOurStock;
                const newTicket = new TicketDTO(totalPrice, user.email)
                const ticketResponse = await ticketDao.createTicket(newTicket);
                const updatedCart = await cartService.replaceProducts(cid, thisCart.products)

                const info = {
                    updatedCart: updatedCart,
                    purchasedItems: productsForTicket,
                    ticket: ticketResponse
                }
                return info;
            }

        } catch (error) {
            throw error
        }
    }
}

export default new TicketService();