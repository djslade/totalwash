import { isValidObjectId } from "mongoose"

export const validateArrayOfObjectIds = (array:string[]) => {
    let isValid = true
    array.forEach((string) => {
        if (isValidObjectId(string) === false) {
            isValid = false
        }
    })
    return isValid
}