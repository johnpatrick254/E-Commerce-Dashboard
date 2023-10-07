"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./src/entities/user.entity");
const role_entity_1 = require("./src/entities/role.entity");
const permision_entity_1 = require("./src/entities/permision.entity");
const product_entity_1 = require("./src/entities/product.entity");
const orders_entity_1 = require("./src/entities/orders.entity");
const orderitem_entity_1 = require("./src/entities/orderitem.entity");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
exports.connection = new typeorm_1.DataSource({
    type: "mysql",
    synchronize: true,
    host: process.env.DB_HOST || "localhost",
    port: +process.env.DB_PORT || 3306,
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "1234",
    database: process.env.DB_DATABASE || "databaseclass",
    entities: [
        user_entity_1.User,
        role_entity_1.Role,
        permision_entity_1.Permision,
        product_entity_1.Product,
        orders_entity_1.Orders,
        orderitem_entity_1.OrderItem,
    ],
    logging: false
});
;
