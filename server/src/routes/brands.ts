import PromiseRouter from "express-promise-router"
import { brandsController } from "../controllers"

const brandsRouter = PromiseRouter()

brandsRouter.get('/:brandId', brandsController.getBrand)
brandsRouter.get('/all', brandsController.getAllBrands)

brandsRouter.post('/', brandsController.postBrand)

brandsRouter.put('/:brandId', brandsController.updateBrand)

brandsRouter.delete('/:brandId', brandsController.deleteBrand)

export {
    brandsRouter,
}