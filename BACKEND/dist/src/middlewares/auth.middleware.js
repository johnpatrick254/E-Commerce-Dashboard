"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddlware = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const ormconfig_1 = require("../../ormconfig");
const user_entity_1 = require("../entities/user.entity");
const authMiddlware = async (req, res, next) => {
    try {
        const { userinfo: jwt } = req.cookies;
        const payload = (0, jsonwebtoken_1.verify)(jwt, "secret");
        if (!payload)
            return res.status(401).send({ message: "unauthentcated user" });
        const { id, ..._ } = payload;
        const repository = ormconfig_1.connection.getRepository(user_entity_1.User);
        req.userinfo = await repository.findOne({
            where: { id: id },
            relations: ['role', 'role.permisions']
        });
        next();
    }
    catch (error) {
        return res.status(401).send({ message: "unauthentcated user" });
    }
};
exports.authMiddlware = authMiddlware;
