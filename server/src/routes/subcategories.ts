import PromiseRouter from "express-promise-router"
import { subcategoriesController } from "../controllers"

const subCategoriesRouter = PromiseRouter()

subCategoriesRouter.get('/:subcategoryId', subcategoriesController.getSubcategory)
subCategoriesRouter.get('/', subcategoriesController.getAllSubcategories)

subCategoriesRouter.post('/', subcategoriesController.postSubcategory)

subCategoriesRouter.put('/:subcategoryId', subcategoriesController.updateSubcategory)

subCategoriesRouter.delete('/:subcategoryId', subcategoriesController.deleteSubcategory)

export {
    subCategoriesRouter,
}