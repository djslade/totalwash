import PromiseRouter from "express-promise-router"
import { checkoutController } from "../controllers"

const checkoutRouter = PromiseRouter()

checkoutRouter.post('/session', checkoutController.createSession)

export {
    checkoutRouter,
}