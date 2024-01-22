import { Router } from "express";
import { getDAOs } from '../models/dao/index.dao.js';

const { MessageDAO } = getDAOs()

const router = Router()

router.get('/', async (req, res) => {
    try {
        let allMessages = await MessageDAO.getAllMessages()
        res.send(allMessages)
    } catch (error) { return { status: 500, error: `Message Router Get failed, catch is ${error.message}` } }
})

router.post('/', async (req, res) => {
    const newMessage = req.body
    if (newMessage.user && newMessage.message) {
        try {
            await MessageDAO.saveMessage(newMessage)
            res.send({ status: 201, message: 'Success' })
        } catch (error) { return { status: 500, error: `Message Router Post failed, catch is ${error.message}` } }
    } else {
        res.send({ status: 400, error: 'user and message needed.' })
    }
})

export default router