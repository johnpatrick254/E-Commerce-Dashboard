"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.permisionMiddleware = void 0;
const permisionMiddleware = async (access) => {
    return async (req, res, next) => {
        const userinfo = req.userinfo;
        const method = req.method;
        const permisions = userinfo?.role.permisions;
        if (method === "get") {
            if (!permisions?.some(p => {
                return (p.name === `view_${access}`) || (p.name === `edit_${access}`);
            })) {
                return res.status(401).send({ message: "user doesn't have permision to process request" });
            }
        }
        else {
            if (!permisions?.some(p => (p.name === `edit_${access}`))) {
                return res.status(401).send({ message: "user doesn't have permision to process request" });
            }
            next();
        }
    };
};
exports.permisionMiddleware = permisionMiddleware;
