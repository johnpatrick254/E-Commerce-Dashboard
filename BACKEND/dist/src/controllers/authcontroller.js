"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePassword = exports.updateInfo = exports.logoutUser = exports.authenticatedUser = exports.login = exports.register = void 0;
const register_validation_1 = require("../validators/register.validation");
const ormconfig_1 = require("../../ormconfig");
const user_entity_1 = require("../entities/user.entity");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = require("jsonwebtoken");
const role_seeder_1 = require("../seeders/role.seeder");
const register = async (req, res) => {
    const { password, password_confirm, ...data } = req.body;
    const { error } = register_validation_1.RegisterValidation.validate(req.body);
    if (error)
        return res.status(400).send(error.details);
    if (password !== password_confirm)
        return res.status(400).send({ message: "Passwords Do not match" });
    const repository = ormconfig_1.connection.getRepository(user_entity_1.User);
    const hashedPassword = await bcryptjs_1.default.hash(password, 3);
    try {
        const { password, id, ...userData } = await repository.save({
            ...data,
            password: hashedPassword,
            role: {
                id: 1
            }
        });
        res.status(200).send(userData);
    }
    catch (error) {
        res.status(403).send({
            err: error
        });
    }
};
exports.register = register;
const login = async (req, res) => {
    (0, role_seeder_1.seedPerms)();
    const { error } = register_validation_1.loginValidation.validate(req.body);
    if (error)
        return res.json({ message: error.message });
    const { email, password } = req.body;
    const repository = ormconfig_1.connection.getRepository(user_entity_1.User);
    const user = await repository.findOneBy({
        email: email
    });
    if (!user)
        return res.status(404).json({ message: "User does not exist" });
    if (await bcryptjs_1.default.compare(password, user.password)) {
        const { password, ...userData } = user;
        const payload = { id: userData.id };
        const token = (0, jsonwebtoken_1.sign)(payload, "secret");
        res.cookie("userinfo", token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });
        res.status(200).send({
            message: "success"
        });
    }
    else {
        return res.status(403).json({ message: "Invalid Credentials" });
    }
};
exports.login = login;
const authenticatedUser = async (req, res) => {
    const user = req.userinfo;
    if (!user)
        return res.status(401).send({ message: "unauthentcated user" });
    const { password, ...userData } = user;
    res.status(200).send(userData);
};
exports.authenticatedUser = authenticatedUser;
const logoutUser = async (_req, res) => {
    res.cookie("userinfo", {
        maxAge: 0
    });
    res.status(200).send({ message: "logged off successfully" });
};
exports.logoutUser = logoutUser;
const updateInfo = async (req, res) => {
    try {
        const user = req.userinfo;
        const repository = ormconfig_1.connection.getRepository(user_entity_1.User);
        if (!req.body)
            return res.status(403).json({ message: "no values provided" });
        const { password: dontUpdate, ...updates } = req.body;
        dontUpdate && console.log({ message: "password was not updated" });
        await repository.update(user.id, updates);
        const { password, ...userData } = await repository.findOneBy({ id: user.id });
        res.status(200).send(userData);
    }
    catch (err) {
        return res.status(502).json({ message: err });
    }
};
exports.updateInfo = updateInfo;
const updatePassword = async (req, res) => {
    try {
        const { error } = register_validation_1.passwordValidation.validate(req.body);
        if (error)
            return res.status(403).json({ message: error.message });
        const { oldPassword, newPassword } = req.body;
        const user = req.userinfo;
        const repository = ormconfig_1.connection.getRepository(user_entity_1.User);
        if (!req.body)
            return res.status(403).json({ message: "no values provided" });
        const { password, ..._userData } = await repository.findOneBy({ id: user.id });
        if (await bcryptjs_1.default.compare(oldPassword, password)) {
            repository.update(user.id, { password: await bcryptjs_1.default.hash(newPassword, 10) });
        }
        else {
            return res.status(403).json({ message: "old password incorrect" });
        }
        res.status(200).send({ message: "success" });
    }
    catch (err) {
        return res.status(502).json({ message: err });
    }
};
exports.updatePassword = updatePassword;
