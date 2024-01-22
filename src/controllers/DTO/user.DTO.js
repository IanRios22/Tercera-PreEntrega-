import bcryptjs from 'bcryptjs';
import CartDAO from '../../models/dao/cart.dao.js';

class UserDTO {
    constructor() {
        this.first_name = null;
        this.last_name = null;
        this.age = null;
        this.email = null;
        this.password = null;
        this.cartId = null;
        this.role = null
    }

    createUser = async (userRegister) => {
        const user = new UserDTO();
        user.first_name = userRegister.first_name;
        user.last_name = userRegister.last_name;
        user.age = userRegister.age;
        user.email = userRegister.email;
        user.password = await this.createHash(userRegister.password);
        user.cartId = await this.createCartForUser();
        user.role = userRegister.role;
        return user;
    }

    async createHash(password) {
        return bcryptjs.hashSync(password, bcryptjs.genSaltSync(10));
    }

    async createCartForUser() {
        try {
            const cartCreationResult = await CartDAO.createCart();
            if (cartCreationResult.status === 200) {
                return cartCreationResult.payload._id
            } else {
                throw new Error('Fallo al crear carrito')
            }
        } catch (error) {
            throw error
        }
    }
}

export default new UserDTO();