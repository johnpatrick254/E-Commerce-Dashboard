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
exports.Orders = void 0;
const typeorm_1 = require("typeorm");
const orderitem_entity_1 = require("./orderitem.entity");
let Orders = class Orders {
    id;
    first_name;
    last_name;
    email;
    created_at;
    order_items;
    get name() {
        return this.first_name + " " + this.last_name;
    }
    get totals() {
        return this.order_items.reduce((a, b) => a + (b.price * b.quantity), 0);
    }
    get profits() {
        const salesPrice = this.order_items.reduce((a, b) => a + (b.price * b.quantity), 0);
        const OgPrice = this.order_items.reduce((a, b) => a + (b.original_price * b.quantity), 0);
        const profit = salesPrice - OgPrice;
        return profit;
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Orders.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Orders.prototype, "first_name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Orders.prototype, "last_name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Orders.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", String)
], Orders.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => orderitem_entity_1.OrderItem, OrderItem => OrderItem.order),
    __metadata("design:type", Array)
], Orders.prototype, "order_items", void 0);
Orders = __decorate([
    (0, typeorm_1.Entity)()
], Orders);
exports.Orders = Orders;
