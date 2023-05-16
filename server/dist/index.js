"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_slug_generator_1 = __importDefault(require("mongoose-slug-generator"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
mongoose_1.default.set('strictQuery', false);
mongoose_1.default.plugin(mongoose_slug_generator_1.default);
mongoose_1.default.connect(process.env.MONGO_URI || '');
app.get('/', (req, res) => {
    res.send('Hello from server');
});
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
