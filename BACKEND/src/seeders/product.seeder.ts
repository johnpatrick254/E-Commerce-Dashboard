import { randomInt } from "crypto";
import { connection } from "../../config/ormconfig"
import { Product } from "../entities/product.entity"
import { fakerEN } from "@faker-js/faker"

export const seedProducts = async () => {
    const productCategories = [
        "Electronics",
        "Clothing",
        "Home and Kitchen",
        "Sports and Outdoors",
        "Beauty and Personal Care",
        "Toys and Games"
    ];

    const productRepo = connection.getRepository(Product)
    for (let index = 0; index < 100; index++) {
        const original_price = fakerEN.commerce.price()
        await productRepo.save({
            name: fakerEN.commerce.productName(),
            description: fakerEN.commerce.productDescription(),
            price: Math.floor(+original_price + ((+original_price * 20) / 100)),
            original_price: +original_price,
            image: fakerEN.image.urlLoremFlickr({ category: 'tech' }),
            category: productCategories[randomInt(0, 5)]
        })

    }
    process.exit(0)
}