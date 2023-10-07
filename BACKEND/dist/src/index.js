"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const ormconfig_1 = require("../config/ormconfig");
const routes_1 = require("./routes/routes");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const process_1 = require("process");
if (!ormconfig_1.connection.initialize())
    (0, process_1.exit)();
const app = (0, express_1.default)();
const PORT = process.env.VITE_PORT || 3000;
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    credentials: true
}));
(0, routes_1.router)(app);
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});
