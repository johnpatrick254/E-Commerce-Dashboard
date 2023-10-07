"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedProducts = void 0;
const crypto_1 = require("crypto");
const ormconfig_1 = require("../../ormconfig");
const product_entity_1 = require("../entities/product.entity");
const faker_1 = require("@faker-js/faker");
const seedProducts = async () => {
    const productCategories = [
        "Electronics",
        "Clothing",
        "Home and Kitchen",
        "Sports and Outdoors",
        "Beauty and Personal Care",
        "Toys and Games"
    ];
    const productRepo = ormconfig_1.connection.getRepository(product_entity_1.Product);
    for (let index = 0; index < 100; index++) {
        const original_price = faker_1.fakerEN.commerce.price();
        const product = await productRepo.save({
            name: faker_1.fakerEN.commerce.productName(),
            description: faker_1.fakerEN.commerce.productDescription(),
            price: Math.floor(+original_price + ((+original_price * 20) / 100)),
            original_price: +original_price,
            image: faker_1.fakerEN.image.urlLoremFlickr({ category: 'tech' }),
            category: productCategories[(0, crypto_1.randomInt)(0, 5)]
        });
        console.log(product);
    }
    process.exit(0);
};
exports.seedProducts = seedProducts;
