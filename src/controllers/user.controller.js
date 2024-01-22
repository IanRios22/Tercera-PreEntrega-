import userService from '../service/user.service.js';

class UserController {
    getAll = async (req, res) => {
        try {
            let allUsers = await userService.getAll()
            res.status(200).send({ total: allUsers.length, payload: allUsers })
        } catch (error) {
            res.status(400).send({ status: 'Error', message: error.message });
        }
    }

    getUserById = async (req, res) => {
        try {
            const { uid } = req.params;
            let findUser = await userService.getUserById(uid);
            if (!findUser) return { status: 'failed', message: 'User not found' };
            res.status(200).send(findUser);
        } catch (error) {
            res.status(400).send({ status: 'Error 400', message: error.message });
        }
    }

    createUser = async (req, res) => {
        try {
            const userRegisterData = req.body
            let result = await userService.createUser(userRegisterData)

            res.status(200).send(result)
        } catch (error) {
            throw error
        }
    }

    deleteUser = async (req, res) => {
        try {
            const { uid } = req.params;
            const response = await userService.deleteUser(uid)
            res.status(200).send(response)
        } catch (error) {
            res.status(400).send({ status: 'Error 400', message: error.message });
        }
    }
}

export default new UserController();