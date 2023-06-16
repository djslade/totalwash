import { categoriesRouter } from "./categories"
import { productsRouter } from "./products"
import { subCategoriesRouter } from "./subcategories"
import { rangesRouter } from "./ranges"
import { cartsRouter } from "./carts"
import { checkoutRouter } from "./checkout"
import PromiseRouter from "express-promise-router"

const apiRouter = PromiseRouter()

apiRouter.use('/categories', categoriesRouter)
apiRouter.use('/products', productsRouter)
apiRouter.use('/subcategories', subCategoriesRouter)
apiRouter.use('/ranges', rangesRouter)
apiRouter.use('/carts', cartsRouter)
apiRouter.use('/checkout', checkoutRouter)

export {
    apiRouter
}
