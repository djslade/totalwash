import { brandsRouter } from "./brands"
import { categoriesRouter } from "./categories"
import { productsRouter } from "./products"
import { subCategoriesRouter } from "./subcategories"
import PromiseRouter from "express-promise-router"

const apiRouter = PromiseRouter()

apiRouter.use('/brands', brandsRouter)
apiRouter.use('/categories', categoriesRouter)
apiRouter.use('/products', productsRouter)
apiRouter.use('/subcategories', subCategoriesRouter)

export {
    apiRouter
}
