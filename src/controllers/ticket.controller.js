import TicketService from "../service/ticket.service.js";

class TicketController {
    getAll = async (req, res) => {
        try {
            const response = await TicketService.getAll();
            res.send(response)
        } catch (error) {
            throw error;
        }
    }
}

export default new TicketController();