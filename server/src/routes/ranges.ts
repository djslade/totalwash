import PromiseRouter from "express-promise-router"
import { rangesController } from "../controllers"

const rangesRouter = PromiseRouter()

rangesRouter.get('/:rangeId', rangesController.getRange)
rangesRouter.get('/', rangesController.getAllRanges)

rangesRouter.post('/', rangesController.postRange)

rangesRouter.put('/:rangeId', rangesController.updateRange)

rangesRouter.delete('/:rangeId', rangesController.deleteRange)

export {
    rangesRouter,
}