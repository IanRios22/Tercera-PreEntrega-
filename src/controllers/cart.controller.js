import CartService from "../service/cart.service.js";
import TicketService from "../service/ticket.service.js";

class CartController {
    getAll = async (req, res) => {
        try {
            const allCarts = await CartService.getAll()
            res.status(200).send({ total: allCarts.carts.length, payload: allCarts })
        } catch (error) {
            throw error
        }
    }

    getCartById = async (req, res) => {
        try {
            const { cid } = req.params;
            const findCart = await CartService.getCartById(cid);
            res.send({ payload: findCart })
        } catch (error) {
            throw error
        }
    }

    createCart = async (req, res) => {
        try {
            const response = await CartService.createCart()
            if (response.status === 200) {
                res.status(200).send({ status: "Ok", message: "New cart added." })
            } else {
                res.send({ status: "Error", payload: response })
            }
        } catch (error) { throw error }
    }

    addToCart = async (req, res) => {
        try {
            const { cid, pid } = req.params

            const result = await CartService.addProductToCart(cid, pid)
            res.status(500).send({ payload: result });
        } catch (error) { throw error }
    }

    updateQuantity = async (req, res) => {
        try {
            const { cid, pid } = req.params

            const quantity = req.body
            const quantityNumber = parseInt(quantity.quantity)

            const result = await CartService.updateQuantity(cid, pid, quantityNumber)
            res.status(200).send({ payload: result })

        } catch (error) { throw error }
    }

    replaceProducts = async (req, res) => {
        try {
            const { cid } = req.params
            const newProducts = req.body

            const result = await CartService.replaceProducts(cid, newProducts)
            res.status(200).send({ payload: result })

        } catch (error) { throw error }
    }

    deleteProductFromCart = async (req, res) => {
        try {
            const { cid, pid } = req.params
            const result = await CartService.deleteProductFromCart(cid, pid)
            res.status(200).send({ payload: result })

        } catch (error) { throw error }
    }

    emptyCart = async (req, res) => {
        try {
            const { cid } = req.params
            const result = await CartService.emptyCart(cid)
            res.status(200).send({ status: "Ok", payload: result })

        } catch (error) { throw error }
    }

    createTicket = async (req, res) => {
        try {
            console.log('ticket controller')
            const { cid } = req.params
            const user = req.session.user
            const response = await TicketService.createTicket(user, cid)
            res.status(200).json(response)

        } catch (error) {
            throw error
        }
    }
}

export default new CartController();