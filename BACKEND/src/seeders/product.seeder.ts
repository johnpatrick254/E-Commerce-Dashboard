import { connection } from "../../config/ormconfig"
import { Product } from "../entities/product.entity"
import {fakerEN} from "@faker-js/faker"

export const seedProducts = async()=>{
const productRepo = connection.getRepository(Product)
for (let index = 0; index < 30 ; index++) {
    await productRepo.save({
        name:fakerEN.commerce.productName(),
        description:fakerEN.commerce.productDescription(),
        price:+fakerEN.commerce.price(),
        image:fakerEN.image.urlLoremFlickr({category:'commerce'})
    })
    
}
process.exit(0)
}