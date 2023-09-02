import { DataSource } from "typeorm";
import { User } from "../src/entities/user.entity";
import { Role } from "../src/entities/role.entity";
import { Permision } from "../src/entities/permision.entity";
import { Product } from "../src/entities/product.entity";
import { Orders } from "../src/entities/orders.entity";
import { OrderItem } from "../src/entities/orderitem.entity";
export const connection = new DataSource({
    type: "mysql",
    synchronize:true,
    host: "localhost",
    port: 3306,
    username: "root",
    password: "1234",
    database: "databaseclass",
    entities: [
         User,
         Role,
         Permision,
         Product,
         Orders,
         OrderItem,
    ],
    logging:false
});
;