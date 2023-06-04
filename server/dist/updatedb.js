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
        yield models_1.Subcategory.findOneAndUpdate({
            slug: "bathroom-accessories",
        }, {
            photo: process.env.CDN_URL + "accessories/bathroom-accessories/bbs_87003_1.jpg"
        });
        yield models_1.Subcategory.findOneAndUpdate({
            slug: "shower-accessories",
        }, {
            photo: process.env.CDN_URL + "accessories/shower-accessories/sbshwmsq500_ls_1000_2.jpg"
        });
        yield models_1.Subcategory.findOneAndUpdate({
            slug: "toilet-accessories",
        }, {
            photo: process.env.CDN_URL + "accessories/toilet-accessories/bctfp001ch_ls_1000_1.jpg"
        });
        yield models_1.Subcategory.findOneAndUpdate({
            slug: "counter-top-basins",
        }, {
            photo: process.env.CDN_URL + "basins/counter-top-basins/bfb2001_hr_1.jpg"
        });
        yield models_1.Subcategory.findOneAndUpdate({
            slug: "pedestal-basins",
        }, {
            photo: process.env.CDN_URL + "basins/pedestal-basins/hlc02931_ls_new_1000_1.jpg"
        });
        yield models_1.Subcategory.findOneAndUpdate({
            slug: "washstands",
        }, {
            photo: process.env.CDN_URL + "basins/washstands/bcws820c_ls_1000_1.jpg"
        });
        yield models_1.Subcategory.findOneAndUpdate({
            slug: "corner-baths",
        }, {
            photo: process.env.CDN_URL + "baths/corner-baths/wbywhnu771l-1_ls_2_1000_1.jpg"
        });
        yield models_1.Subcategory.findOneAndUpdate({
            slug: "freestanding-baths",
        }, {
            photo: process.env.CDN_URL + "baths/freestanding-baths/fsb036_ls_1000_1.jpg"
        });
        yield models_1.Subcategory.findOneAndUpdate({
            slug: "shower-baths",
        }, {
            photo: process.env.CDN_URL + "baths/shower-baths/ssebsbsb_ls_new_1000_1.jpg"
        });
        yield models_1.Subcategory.findOneAndUpdate({
            slug: "small-baths",
        }, {
            photo: process.env.CDN_URL + "baths/small-baths/ssbmerdpan_ls_1000_1.jpg"
        });
        yield models_1.Subcategory.findOneAndUpdate({
            slug: "standard-baths",
        }, {
            photo: process.env.CDN_URL + "baths/standard-baths/tr-sos1770_1_ls_1000_1.jpg"
        });
        yield models_1.Subcategory.findOneAndUpdate({
            slug: "mirrors",
        }, {
            photo: process.env.CDN_URL + "furniture/mirrors/bfm1004gr-uv_1.jpg"
        });
        yield models_1.Subcategory.findOneAndUpdate({
            slug: "cabinets-and-storage",
        }, {
            photo: process.env.CDN_URL + "furniture/storage-units/bbs_78613_image_1.jpg"
        });
        yield models_1.Subcategory.findOneAndUpdate({
            slug: "vanity-units",
        }, {
            photo: process.env.CDN_URL + "furniture/vanity-units/bfcm1200w_ls_2_chrome_1.jpg"
        });
        yield models_1.Subcategory.findOneAndUpdate({
            slug: "mixer-showers-and-sets",
        }, {
            photo: process.env.CDN_URL + "showers/mixer-showers-and-sets/ml7046_ls_1_new_1000_1.jpg"
        });
        yield models_1.Subcategory.findOneAndUpdate({
            slug: "bidets",
        }, {
            photo: process.env.CDN_URL + "toilets/bidets/wasbid_co_1000_1.jpg"
        });
        yield models_1.Subcategory.findOneAndUpdate({
            slug: "standard-toilets",
        }, {
            photo: process.env.CDN_URL + "toilets/standard-toilets/bctcc008_ls_1000_1.jpg"
        });
    }
    catch (err) {
        console.log(err);
    }
});
updatedb();
