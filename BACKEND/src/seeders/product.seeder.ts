import { connection } from "../../config/ormconfig"
import { Product } from "../entities/product.entity"
import {fakerEN} from "@faker-js/faker"

export const seedProducts = async()=>{
const productRepo = connection.getRepository(Product)
for (let index = 0; index < 50 ; index++) {
    const original_price = fakerEN.commerce.price()
    await productRepo.save({
        name:fakerEN.commerce.productName(),
        description:fakerEN.commerce.productDescription(),
        price:Math.floor(+original_price + ((+original_price * 20)/100)),
        original_price:+original_price,
        image:fakerEN.image.urlLoremFlickr({category:'tech'})
    })
    
}
process.exit(0)
}