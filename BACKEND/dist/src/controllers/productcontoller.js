"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.fetchOneProduct = exports.createProduct = exports.fetchAllProducts = void 0;
const ormconfig_1 = require("../../ormconfig");
const product_entity_1 = require("../entities/product.entity");
const fetchAllProducts = async (req, res) => {
    try {
        let pageNumber = parseInt(req.query.page || "1");
        let category = req.query.category;
        const take = 20;
        const repository = ormconfig_1.connection.getRepository(product_entity_1.Product);
        const { "0": products, "1": totals } = await repository.findAndCount({
            take: take,
            skip: ((pageNumber - 1) * take),
            where: { category: category }
        });
        res.status(200).send({
            data: products,
            meta: {
                total: totals,
                page: pageNumber,
                last_page: Math.ceil(totals / take)
            }
        });
    }
    catch (err) {
        return res.status(502).json({ message: err });
    }
};
exports.fetchAllProducts = fetchAllProducts;
const createProduct = async (req, res) => {
    const { name, description, image, price, category, original_price } = req.body;
    try {
        const repository = ormconfig_1.connection.getRepository(product_entity_1.Product);
        const product = await repository.save({
            name: name,
            description: description,
            image: image,
            price: price,
            category: category,
            original_price: original_price
        });
        res.status(200).send(product);
    }
    catch (err) {
        console.log(err);
        return res.status(502).json({ message: err });
    }
};
exports.createProduct = createProduct;
const fetchOneProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const repository = ormconfig_1.connection.getRepository(product_entity_1.Product);
        const fetchedData = await repository.findOne({ where: { id: +id } });
        if (!fetchedData)
            return res.status(404).send({ message: "product not found" });
        res.status(200).send(fetchedData);
    }
    catch (err) {
        console.log(err);
        return res.status(502).json({ message: err });
    }
};
exports.fetchOneProduct = fetchOneProduct;
const updateProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const repository = ormconfig_1.connection.getRepository(product_entity_1.Product);
        const product = await repository.save({
            id: +id,
            ...req.body,
        });
        res.status(200).send(product);
    }
    catch (err) {
        console.log(err);
        return res.status(502).json({ message: err });
    }
};
exports.updateProduct = updateProduct;
const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const repository = ormconfig_1.connection.getRepository(product_entity_1.Product);
        await repository.delete(id);
        res.status(200).send(null);
    }
    catch (err) {
        console.log(err);
        return res.status(502).json({ message: err });
    }
};
exports.deleteProduct = deleteProduct;
