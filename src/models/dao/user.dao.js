import { userModel } from "../schemas/user.schema.js";

export default class UserDAO {
    constructor() {
        console.log('UserDAO conectado');
    }

    //Obtener todos los usuarios
    getAll = async () => {
        try {
            const users = await userModel.find().lean()
            return users
        } catch (error) {
            throw error
        }
    }

    //Obtener producto con el ID
    getUserById = async (userData) => {
        try {
            let exists = await userModel.findOne({ email: userData.email })
            if (exists) {
                return {
                    status: 403,
                    error: 'Direccion de Email esta registrada'
                }
            }
            const user = await userModel.create(userData)
            return ({ status: 200, message: 'Ususario creado.', payload: user })
        } catch (error) {
            throw error
        }
    }

    //Eliminar usuario
    deleteUser = async (uid) => {
        try {
            let exists = await userModel.findById(uid)
            let response = `User ${exists.first_name} ${exists.last_name} ${exists.email}`
            let result = await userModel.deleteOne({ _id: uid });
            if (result.deletedCount === 0) {
                return null
            }
            return { status: 'Success', payload: response };
        } catch (error) {
            throw error;
        }
    }
}