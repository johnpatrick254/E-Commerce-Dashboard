"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../../config/database");
const permision_entity_1 = require("../entities/permision.entity");
const seedPerms = async () => {
    const permisionRepository = database_1.connection.getRepository(permision_entity_1.Permision);
    const permisions = ["view_users", "edit_users", "view_roles", "edit_roles", "view_products", "edit_products", "view_orders", "edit_orders"];
    for (const perm of permisions) {
        await permisionRepository.save({
            name: perm
        });
    }
};
seedPerms();
