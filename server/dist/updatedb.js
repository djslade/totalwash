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
const models_1 = require("./models");
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
mongoose_1.default.set('strictQuery', false);
mongoose_1.default.connect(process.env.MONGO_URI || "");
const updatedb = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield models_1.Category.findOneAndUpdate({
            slug: "furniture",
        }, {
            photo: process.env.CDN_URL + "furniture/furniture-cover.jpg"
        });
        yield models_1.Category.findOneAndUpdate({
            slug: "accessories",
        }, {
            photo: process.env.CDN_URL + "accessories/accessories-cover.jpg"
        });
        yield models_1.Category.findOneAndUpdate({
            slug: "basins",
        }, {
            photo: process.env.CDN_URL + "basins/basins-cover.jpg"
        });
        yield models_1.Category.findOneAndUpdate({
            slug: "baths",
        }, {
            photo: process.env.CDN_URL + "baths/baths-cover.jpg"
        });
        yield models_1.Category.findOneAndUpdate({
            slug: "showers",
        }, {
            photo: process.env.CDN_URL + "showers/showers-cover.jpg"
        });
        yield models_1.Category.findOneAndUpdate({
            slug: "toilets",
        }, {
            photo: process.env.CDN_URL + "toilets/toilets-cover.jpg"
        });
    }
    catch (err) {
        console.log(err);
    }
});
updatedb();
