"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderItem = void 0;
const typeorm_1 = require("typeorm");
const orders_entity_1 = require("./orders.entity");
const crypto_1 = require("crypto");
let OrderItem = class OrderItem {
    id;
    product_id;
    productTitle;
    price;
    original_price;
    quantity;
    order;
    async setPrice(repo) {
        const price = await repo.findOne({ where: { id: +this.product_id } });
        if (price) {
            this.price = price.price;
            this.original_price = price.original_price;
        }
        else {
            this.price = (0, crypto_1.randomInt)(100, 250);
            this.original_price = (0, crypto_1.randomInt)(100, 250);
        }
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], OrderItem.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], OrderItem.prototype, "product_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], OrderItem.prototype, "productTitle", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], OrderItem.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], OrderItem.prototype, "original_price", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], OrderItem.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => orders_entity_1.Orders),
    (0, typeorm_1.JoinColumn)({
        name: 'order_id'
    }),
    __metadata("design:type", orders_entity_1.Orders)
], OrderItem.prototype, "order", void 0);
OrderItem = __decorate([
    (0, typeorm_1.Entity)()
], OrderItem);
exports.OrderItem = OrderItem;
