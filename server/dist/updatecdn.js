"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const models_1 = require("./src/models");
const models_2 = require("./src/models");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
mongoose_1.default.set('strictQuery', false);
mongoose_1.default.connect(process.env.MONGO_URI || "");
const updateRangeCollection = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const ranges = yield models_1.Range.find({}); // Fetch all documents from the Range collection
        const regex = /totalwash\//g;
        for (const range of ranges) {
            const updatedPhoto = (_a = range.photo) === null || _a === void 0 ? void 0 : _a.replace(/https:\/\/d2tgvtaoa6ihgv\.cloudfront\.net\//g, "https://d2tgvtaoa6ihgv.cloudfront.net/totalwash/");
            range.photo = updatedPhoto;
            console.log(range.photo);
            yield range.save(); // Save the updated document
        }
        console.log("Task complete");
    }
    catch (error) {
        console.log(error);
    }
});
const updateProductCollection = () => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const products = yield models_2.Product.find({});
        for (const product of products) {
            const updatedPhotos = (_b = product.photos) === null || _b === void 0 ? void 0 : _b.map((photo) => {
                const newPhoto = photo.replace(/https:\/\/d2tgvtaoa6ihgv\.cloudfront\.net\//g, "https://d2tgvtaoa6ihgv.cloudfront.net/totalwash/");
                return newPhoto;
            });
            product.photos = updatedPhotos;
            console.log(product.photos);
            yield product.save();
        }
        console.log("Task complete");
    }
    catch (error) {
        console.log(error);
    }
});
const logAllPhotos = () => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const products = yield models_2.Product.find({});
    for (const product of products) {
        (_c = product.photos) === null || _c === void 0 ? void 0 : _c.map((photo) => {
            console.log(photo);
            return photo;
        });
    }
    const ranges = yield models_1.Range.find({});
    for (const range of ranges) {
        console.log(range.photo);
    }
});
logAllPhotos();
