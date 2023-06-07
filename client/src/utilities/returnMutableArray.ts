import { Product } from "@/types"

export const returnMutableCartArray = (cartContents:readonly Product[]) => {
    const mutableArray = cartContents.filter((product) => product)
    return mutableArray
}