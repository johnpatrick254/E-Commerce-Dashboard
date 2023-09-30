import { connection } from "../../config/ormconfig";
import { fakerEN } from "@faker-js/faker";
import { Orders } from "../entities/orders.entity";
import { randomInt } from "crypto";
import { OrderItem } from "../entities/orderitem.entity";
import { Product } from "../entities/product.entity";

export const seedOrders = async () => {
  const orderRepo = connection.getRepository(Orders);
  const orderItemRepo = connection.getRepository(OrderItem);
  const productItemRepo = connection.getRepository(Product);

  for (let index = 0; index < 200; index++) {
    const order = await orderRepo.save({
      first_name: fakerEN.person.firstName(),
      last_name: fakerEN.person.lastName(),
      email: fakerEN.internet.email(),
      created_at: fakerEN.date.past({ years: 2 }).toISOString(),
    });
    
    for (let i = 0; i < randomInt(1, 6); i++) {
      const io = new OrderItem()
      io.productTitle = fakerEN.commerce.productName();
      io.quantity = randomInt(5, 9);
      io.order = order;
      io.product_id = randomInt(1, 50);
      await io.setPrice(productItemRepo);
      await orderItemRepo.save(io);
      console.log(io);
    }
  }
  process.exit(0);
};
