"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.totalUsers = exports.deleteUsers = exports.updateUsers = exports.fetchOneUsers = exports.createUsers = exports.fetchAllUsers = void 0;
const user_entity_1 = require("../entities/user.entity");
const ormconfig_1 = require("../../ormconfig");
const bcryptjs_1 = require("bcryptjs");
const fetchAllUsers = async (req, res) => {
    try {
        let pageNumber = parseInt(req.query.page || "1");
        const take = 15;
        const repository = ormconfig_1.connection.getRepository(user_entity_1.User);
        const { "0": users, "1": total } = await repository.findAndCount({
            take: take,
            skip: (pageNumber - 1) * take,
            relations: ['role']
        });
        res.status(200).send({
            data: users.map(user => {
                const { password, ...data } = user;
                return data;
            }),
            meta: {
                total: total,
                page: pageNumber,
                lastpage: Math.ceil(total / take)
            }
        });
    }
    catch (err) {
        return res.status(502).json({ message: err });
    }
};
exports.fetchAllUsers = fetchAllUsers;
const createUsers = async (req, res) => {
    try {
        const { role_id, password_confirm: setPassword, ...body } = req.body;
        const password = await (0, bcryptjs_1.hash)(setPassword, 10);
        const repository = ormconfig_1.connection.getRepository(user_entity_1.User);
        const { password: hashedPass, password_confirm, ...user } = await repository.save({
            ...body,
            password: password,
            role: {
                id: role_id
            }
        });
        res.status(200).send(user);
    }
    catch (err) {
        console.log(err);
        return res.status(502).json({ message: err });
    }
};
exports.createUsers = createUsers;
const fetchOneUsers = async (req, res) => {
    try {
        const id = req.params.id;
        const repository = ormconfig_1.connection.getRepository(user_entity_1.User);
        const fetchedData = await repository.findOne({ relations: ['role'], where: { id: +id } });
        if (!fetchedData)
            return res.status(404).send({ message: "user not found" });
        const { password, ...users } = fetchedData;
        res.status(200).send(users);
    }
    catch (err) {
        console.log(err);
        return res.status(502).json({ message: err });
    }
};
exports.fetchOneUsers = fetchOneUsers;
const updateUsers = async (req, res) => {
    try {
        const id = req.params.id;
        const { role_id, password: dontUpdate, ...body } = req.body;
        const repository = ormconfig_1.connection.getRepository(user_entity_1.User);
        await repository.update(id, {
            ...body,
            role: {
                id: role_id
            }
        });
        const { password, ...users } = await repository.findOne({ where: { id: +id }, relations: ['role'] });
        res.status(200).send(users);
    }
    catch (err) {
        console.log(err);
        return res.status(502).json({ message: err });
    }
};
exports.updateUsers = updateUsers;
const deleteUsers = async (req, res) => {
    try {
        const id = req.params.id;
        const repository = ormconfig_1.connection.getRepository(user_entity_1.User);
        await repository.delete(id);
        res.status(200).send(null);
    }
    catch (err) {
        console.log(err);
        return res.status(502).json({ message: err });
    }
};
exports.deleteUsers = deleteUsers;
const totalUsers = async (_req, res) => {
    const results = await ormconfig_1.connection.query("SELECT COUNT(*) as data FROM user;");
    res.status(200).send(results);
};
exports.totalUsers = totalUsers;
