"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateArrayOfObjectIds = void 0;
const mongoose_1 = require("mongoose");
const validateArrayOfObjectIds = (array) => {
    let isValid = true;
    array.forEach((string) => {
        if ((0, mongoose_1.isValidObjectId)(string) === false) {
            isValid = false;
        }
    });
    return isValid;
};
exports.validateArrayOfObjectIds = validateArrayOfObjectIds;
