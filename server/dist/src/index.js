"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_slug_generator_1 = __importDefault(require("mongoose-slug-generator"));
const routes_1 = require("./routes");
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = require("body-parser");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
mongoose_1.default.set("strictQuery", false);
mongoose_1.default.plugin(mongoose_slug_generator_1.default);
mongoose_1.default.connect(process.env.MONGO_URI || "");
app.use((0, body_parser_1.json)());
app.use((0, body_parser_1.urlencoded)({ extended: false }));
app.use((0, cors_1.default)());
app.use("/api", routes_1.apiRouter);
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
