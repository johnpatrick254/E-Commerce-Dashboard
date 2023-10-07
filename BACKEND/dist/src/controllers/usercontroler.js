"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchAllUsers = void 0;
const user_entity_1 = require("../entities/user.entity");
const database_1 = require("../../config/database");
const fetchAllUsers = async (req, res) => {
    try {
        const user = req.userinfo;
        const repository = database_1.connection.getRepository(user_entity_1.User);
        res.status(200).send(await repository.find());
    }
    catch (err) {
        return res.status(502).json({ message: err });
    }
};
exports.fetchAllUsers = fetchAllUsers;
