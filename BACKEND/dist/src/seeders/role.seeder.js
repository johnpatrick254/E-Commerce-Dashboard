"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedPerms = void 0;
const ormconfig_1 = require("../../ormconfig");
const permision_entity_1 = require("../entities/permision.entity");
const role_entity_1 = require("../entities/role.entity");
const seedPerms = async () => {
    const permisionRepository = ormconfig_1.connection.getRepository(permision_entity_1.Permision);
    const permisions = ["view_users", "edit_users", "view_roles", "edit_roles", "view_products", "edit_products", "view_orders", "edit_orders"];
    let perms = [];
    for (const perm of permisions) {
        perms.push(await permisionRepository.save({
            name: perm
        }));
    }
    const roleRepository = ormconfig_1.connection.getRepository(role_entity_1.Role);
    await roleRepository.save({
        name: 'Admin',
        permisions: perms
    });
    delete perms[3];
    await roleRepository.save({
        name: 'Editors',
        permisions: perms
    });
    delete perms[1];
    delete perms[3];
    delete perms[5];
    delete perms[7];
    await roleRepository.save({
        name: 'Viewer',
        permisions: perms
    });
};
exports.seedPerms = seedPerms;
