import { generateCode } from "../../utils.js";

export default class TicketDTO {
    constructor(totalPrice, purchaser) {
        this.code = generateCode();
        this.amount = totalPrice
        this.purchaser = purchaser
    }
}