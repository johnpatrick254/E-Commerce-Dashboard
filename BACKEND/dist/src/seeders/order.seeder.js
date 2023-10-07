"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedOrders = void 0;
const ormconfig_1 = require("../../ormconfig");
const faker_1 = require("@faker-js/faker");
const orders_entity_1 = require("../entities/orders.entity");
const crypto_1 = require("crypto");
const orderitem_entity_1 = require("../entities/orderitem.entity");
const product_entity_1 = require("../entities/product.entity");
const seedOrders = async () => {
    const orderRepo = ormconfig_1.connection.getRepository(orders_entity_1.Orders);
    const orderItemRepo = ormconfig_1.connection.getRepository(orderitem_entity_1.OrderItem);
    const productItemRepo = ormconfig_1.connection.getRepository(product_entity_1.Product);
    for (let index = 0; index < 200; index++) {
        const order = await orderRepo.save({
            first_name: faker_1.fakerEN.person.lastName(),
            last_name: faker_1.fakerEN.person.lastName(),
            email: faker_1.fakerEN.internet.email(),
            created_at: faker_1.fakerEN.date.past({ years: 2 }).toISOString(),
        });
        for (let i = 0; i < (0, crypto_1.randomInt)(1, 6); i++) {
            const io = new orderitem_entity_1.OrderItem();
            io.productTitle = faker_1.fakerEN.commerce.productName();
            io.quantity = (0, crypto_1.randomInt)(5, 9);
            io.order = order;
            io.product_id = (0, crypto_1.randomInt)(1, 50);
            await io.setPrice(productItemRepo);
            await orderItemRepo.save(io);
            console.log(io);
        }
    }
    process.exit(0);
};
exports.seedOrders = seedOrders;
