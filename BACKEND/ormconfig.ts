import { DataSource } from "typeorm";
import { User } from "./src/entities/user.entity";
import { Role } from "./src/entities/role.entity";
import { Permision } from "./src/entities/permision.entity";
import { Product } from "./src/entities/product.entity";
import { Orders } from "./src/entities/orders.entity";
import { OrderItem } from "./src/entities/orderitem.entity";
import * as dotenv from "dotenv";
dotenv.config()
export const connection = new DataSource({
    type: "mysql",
    synchronize:true,  
    host: process.env.DB_HOST || "localhost",
    port: +process.env.DB_PORT! || 3306,
    username: process.env.DB_USERNAME || "root",
    password:process.env.DB_PASSWORD || "1234",
    database: process.env.DB_DATABASE || "databaseclass",
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