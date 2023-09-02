import { connection } from "../../config/ormconfig"
import {fakerEN} from "@faker-js/faker"
import { Orders } from "../entities/orders.entity"
import { randomInt } from "crypto"
import { OrderItem } from "../entities/orderitem.entity"
import { log } from "console"

export const seedOrders = async()=>{
const orderRepo = connection.getRepository(Orders)
const orderItemRepo= connection.getRepository(OrderItem)
for (let index = 0; index < 70 ; index++) {
    const order = await orderRepo.save({
        first_name:fakerEN.person.firstName(),
        last_name:fakerEN.person.lastName(),
        email:fakerEN.internet.email(),
        created_at:fakerEN.date.past({years:2}).toISOString()
        })
    for(let i = 0 ;i<randomInt(1,6);i++){
     const oi= await orderItemRepo.save({
        productTitle:fakerEN.commerce.productName(),
        price:randomInt(20,850),
        quantity:randomInt(1,15),
        order:order,
      })
      console.log(oi);
      
    }
}
process.exit(0)
}