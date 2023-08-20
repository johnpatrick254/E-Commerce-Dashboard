import { DataSource } from "typeorm";
import { User } from "../src/entities/user.entity";
export const connection = new DataSource({
    type: "mysql",
    synchronize:true,
    host: "localhost",
    port: 3306,
    username: "root",
    password: "1234",
    database: "databaseclass",
    entities: [
         User
    ],
    logging:false
});
;