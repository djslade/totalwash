import PromiseRouter from "express-promise-router"
import { productsController } from "../controllers"

const productsRouter = PromiseRouter()

productsRouter.get('/:productId', productsController.getProduct)
productsRouter.get('/', productsController.getAllProducts)

productsRouter.post('/', productsController.postProduct)

productsRouter.put('/:productId', productsController.updateProduct)

productsRouter.delete('/:productId', productsController.deleteProduct)

export {
    productsRouter,
}