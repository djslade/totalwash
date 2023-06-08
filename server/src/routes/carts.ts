import PromiseRouter from "express-promise-router"
import { cartsController } from "../controllers"

const cartsRouter = PromiseRouter()

cartsRouter.get('/:cartId', cartsController.getCart)

cartsRouter.post('/', cartsController.createCart)

cartsRouter.put('/:cartId', cartsController.updateCart)

cartsRouter.delete('/:cartId', cartsController.deleteCart)

export {
    cartsRouter,
}