"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRoles = exports.updateRoles = exports.getRolesByID = exports.creatRoles = exports.roles = void 0;
const ormconfig_1 = require("../../ormconfig");
const role_entity_1 = require("../entities/role.entity");
const roles = async (_req, res) => {
    const roleRep = ormconfig_1.connection.getRepository(role_entity_1.Role);
    res.send(await roleRep.find());
};
exports.roles = roles;
const creatRoles = async (req, res) => {
    const { name, permisions } = req.body;
    const roleRep = ormconfig_1.connection.getRepository(role_entity_1.Role);
    const newRole = await roleRep.save({
        name: name,
        permisions: permisions.map(id => ({ id }))
    });
    res.status(200).send(newRole);
};
exports.creatRoles = creatRoles;
const getRolesByID = async (req, res) => {
    const { id } = req.params;
    const roleRep = ormconfig_1.connection.getRepository(role_entity_1.Role);
    const newRole = await roleRep.findOne({
        where: { id: +id },
        relations: ['permisions']
    });
    res.status(200).send(newRole);
};
exports.getRolesByID = getRolesByID;
const updateRoles = async (req, res) => {
    const { id } = req.params;
    const { name, permisions } = req.body;
    const roleRep = ormconfig_1.connection.getRepository(role_entity_1.Role);
    const newRole = await roleRep.save({
        id: +id,
        name: name,
        permisions: permisions.map(id => ({ id }))
    });
    res.status(200).send(newRole);
};
exports.updateRoles = updateRoles;
const deleteRoles = async (req, res) => {
    const { id } = req.params;
    const roleRep = ormconfig_1.connection.getRepository(role_entity_1.Role);
    await roleRep.delete(id);
    res.status(200).send({ message: 'success' });
};
exports.deleteRoles = deleteRoles;
