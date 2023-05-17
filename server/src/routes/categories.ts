import PromiseRouter from "express-promise-router"
import { categoriesController } from "../controllers"

const categoriesRouter = PromiseRouter()

categoriesRouter.get('/:categoryId', categoriesController.getCategory)
categoriesRouter.get('/all', categoriesController.getAllCategories)

categoriesRouter.post('/', categoriesController.postCategory)

categoriesRouter.put('/:categoryId', categoriesController.updateCategory)

categoriesRouter.delete('/:categoryId', categoriesController.deleteCategory)

export {
    categoriesRouter,
}