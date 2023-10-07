"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Permisions = void 0;
const ormconfig_1 = require("../../ormconfig");
const permision_entity_1 = require("../entities/permision.entity");
const Permisions = async (_req, res) => {
    const permRep = ormconfig_1.connection.getRepository(permision_entity_1.Permision);
    res.send(await permRep.find());
};
exports.Permisions = Permisions;
