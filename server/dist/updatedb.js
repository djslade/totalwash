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
        yield models_1.Product.findOneAndUpdate({
            name: "Milano Hest - Stone Grey Traditional Freestanding Corner Shower Bath with Black Feet and Black Grid Screen - 1685mm x 750mm - Left/Right Hand Options",
        }, {
            description: [
                "Make a style statement in your traditional bathroom with the stunning Milano Hest stone grey 1685mm x 750mm freestanding corner shower bath, complete with black grid glass screen and decorative black feet.",
                "This freestanding bath comes in left and right hand corner options to suit your bathroom design - just make your selection from the options above.",
                "This robust and sturdy freestanding corner bath features a stone grey exterior and black feet, creating a bold yet utterly elegant and sophisticated look. There’s ample bathing space for a relaxing soak, and thanks to the corner design and the included glass screen, you can shower in total comfort too.",
                "The bath screen features a black grid pattern, creating a striking look. Featuring 6mm toughened glass with an easy-clean protective coating, the bath screen is a stylish and practical way to protect your bathroom floor from spills and splashes when taking a shower.",
                "Team with some stylish traditional Milano black bath taps to complete and further elevate the look of this freestanding bath.",
            ],
        });
    }
    catch (err) {
        console.log(err);
    }
    finally {
        console.log('all done');
    }
});
updatedb();
