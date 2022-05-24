"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const passport_1 = __importDefault(require("passport"));
// import passportConfig from "./passportConfig";
exports.default = (app) => {
    const { PORT, SECRET } = process.env;
    app.use(body_parser_1.default.json());
    app.use(body_parser_1.default.urlencoded({ extended: true }));
    app.use((0, cors_1.default)({
        origin: `http://localhost:${PORT}`,
        credentials: true,
    }));
    app.use((0, express_session_1.default)({
        secret: SECRET,
        resave: true,
        saveUninitialized: true,
    }));
    app.use((0, cookie_parser_1.default)(SECRET));
    app.use(passport_1.default.initialize());
    app.use(passport_1.default.session());
    // passportConfig(passport);
};
