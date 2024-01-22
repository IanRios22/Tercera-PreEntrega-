import { Router } from 'express'
import cartsRouter from './cart.routes.js'
import productsRouter from './product.routes.js'
import usersRouter from './user.routes.js'
import sessionsRouter from './session.routes.js'
import viewsRouter from './views.routes.js'
import messageRouter from './message.routes.js'
import ticketsRouter from './ticket.routes.js'

const router = Router()

router.use('/', viewsRouter)
router.use('/api/products', productsRouter)
router.use('/api/carts', cartsRouter)
router.use('/api/messages', messageRouter)
router.use('/api/sessions', sessionsRouter)
router.use('/api/users', usersRouter)
router.use('/api/tickets', ticketsRouter)

export default router