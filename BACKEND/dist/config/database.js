"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../src/entities/user.entity");
const role_entity_1 = require("../src/entities/role.entity");
const permision_entity_1 = require("../src/entities/permision.entity");
exports.connection = new typeorm_1.DataSource({
    type: "mysql",
    synchronize: true,
    host: "localhost",
    port: 3306,
    username: "root",
    password: "1234",
    database: "databaseclass",
    entities: [
        user_entity_1.User,
        role_entity_1.Role,
        permision_entity_1.Permision
    ],
    logging: false
});
;
