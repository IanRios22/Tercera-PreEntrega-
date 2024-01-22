import userDao from '../models/dao/user.dao.js';
import UserDTO from '../controllers/DTO/user.DTO.js';

class UserService {
    getAll = async () => {
        try {
            let users = await userDao.getAll();
            return users
        } catch (error) {
            throw error;
        }
    }

    async getUserById(uid) {
        try {
            const user = await userDao.getUserById(uid);
            return user
        } catch (error) {
            throw error;
        }
    }

    async createUser(userRegister) {
        try {
            const newUser = await UserDTO.createUser(userRegister);
            let result = await userDao.createUser(newUser);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async deleteUser(uid) {
        try {
            const response = await userDao.deleteUser(uid);
            return response === null ? { status: 'error', message: 'User no encontrado' } : response;
        } catch (error) {
            throw error;
        }
    }
}

export default new UserService();