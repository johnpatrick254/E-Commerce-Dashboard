"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.totalOrdersChart = exports.totalOrders = exports.topProductsData = exports.chartData = exports.fetchProfitData = exports.exportCSV = exports.fetchAllOrders = void 0;
const ormconfig_1 = require("../../ormconfig");
const orders_entity_1 = require("../entities/orders.entity");
const json2csv_1 = require("json2csv");
const fetchAllOrders = async (req, res) => {
    try {
        let pageNumber = parseInt(req.query.page || "1");
        const take = 15;
        const repository = ormconfig_1.connection.getRepository(orders_entity_1.Orders);
        const { "0": orders, "1": totals } = await repository.findAndCount({
            take: take,
            skip: ((pageNumber - 1) * take),
            relations: ['order_items'],
            order: { created_at: "DESC" }
        });
        res.status(200).send({
            data: orders.map(order => ({
                id: order.id,
                name: order.name,
                email: order.email,
                total: order.totals,
                created_at: order.created_at,
                order_items: order.order_items
            })),
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
exports.fetchAllOrders = fetchAllOrders;
const exportCSV = async (_req, res) => {
    try {
        const parser = new json2csv_1.Parser({
            fields: ['ID', 'Name', 'Email', 'Product Title', 'Price', 'Quantity']
        });
        const repository = ormconfig_1.connection.getRepository(orders_entity_1.Orders);
        const orders = await repository.find({
            relations: ['order_items']
        });
        const json = [];
        orders.forEach(order => {
            json.push({
                ID: order.id,
                Name: order.name,
                Email: order.email,
                "Product Title": '',
                Price: '',
                Quantity: '',
            });
            order.order_items.forEach(item => {
                json.push({
                    ID: '',
                    Name: '',
                    Email: '',
                    "Product Title": item.productTitle,
                    Price: item.price,
                    Quantity: item.price,
                });
            });
            const csv = parser.parse(json);
            res.header("content-type:text/csv");
            res.attachment('orders.csv');
            return res.send(csv);
        });
    }
    catch (error) {
        console.log(error);
    }
};
exports.exportCSV = exportCSV;
const fetchProfitData = async (req, res) => {
    try {
        let pageNumber = parseInt(req.query.page || "1");
        const take = 15;
        const repository = ormconfig_1.connection.getRepository(orders_entity_1.Orders);
        const { "0": orders, "1": _totals } = await repository.findAndCount({
            take: take,
            skip: ((pageNumber - 1) * take),
            relations: ['order_items'],
            order: { created_at: "ASC" }
        });
        const data = orders.map(order => ({
            profit: order.profits,
            date: order.created_at,
        }));
        res.status(200).send(data);
    }
    catch (err) {
        return res.status(502).json({ message: err });
    }
};
exports.fetchProfitData = fetchProfitData;
const chartData = async (_req, res) => {
    const results = await ormconfig_1.connection.query("SELECT DATE_FORMAT( o.created_at,'%y-%m-%d') AS date, SUM(i.price*i.quantity) as orders_sum FROM orders o JOIN order_item i ON o.id =i.order_id GROUP BY date ORDER BY date ASC;");
    res.status(200).send(results);
};
exports.chartData = chartData;
const topProductsData = async (_req, res) => {
    const results = await ormconfig_1.connection.query("SELECT p.id,p.price,p.image, GROUP_CONCAT(p.name) AS names, SUM(p.price * o.quantity) AS total_price, SUM(o.quantity) AS total_quantity FROM product AS p JOIN order_item o ON p.id = o.product_id GROUP BY p.id ORDER BY total_quantity DESC;");
    res.status(200).send(results);
};
exports.topProductsData = topProductsData;
const totalOrders = async (_req, res) => {
    const results = await ormconfig_1.connection.query("SELECT COUNT(*) FROM order_item;");
    res.status(200).send(results);
};
exports.totalOrders = totalOrders;
const totalOrdersChart = async (_req, res) => {
    const results = await ormconfig_1.connection.query("SELECT DATE_FORMAT( o.created_at,'%y-%m-%d') AS name, SUM(i.quantity) as sales FROM orders o JOIN order_item i ON o.id =i.order_id GROUP BY name ORDER BY name ASC;");
    res.status(200).send(results);
};
exports.totalOrdersChart = totalOrdersChart;
