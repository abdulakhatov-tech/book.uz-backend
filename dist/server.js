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
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
// loading environment variables from.env file
dotenv_1.default.config();
const app = (0, express_1.default)();
// middleware
app.use(express_1.default.static("public"));
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
// Routes config
app.use('/api', routes_1.default);
const startServer = () => {
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(`${process.env.MONGO_URI}/db`);
            console.log('MongoDB connected.');
            console.log(`Server is running on port ${process.env.PORT}.`);
        }
        catch (error) {
            console.log(error);
        }
    }));
};
startServer();
