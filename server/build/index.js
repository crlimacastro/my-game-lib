"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const middleware_1 = __importDefault(require("./middleware"));
const router_1 = __importDefault(require("./router"));
// Init .env variables
dotenv_1.default.config();
const { PORT } = process.env;
// Create server
const app = (0, express_1.default)();
// Init middleware
(0, middleware_1.default)(app);
// Init router
app.use(router_1.default);
// Start server
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
