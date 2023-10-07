import { Request, RequestHandler } from "express";
import { verify } from "jsonwebtoken";
import { connection } from "../../ormconfig";
import { User } from "../entities/user.entity";

interface RequestUser extends Request {
    userinfo?: User;
}
export const authMiddlware: RequestHandler = async (req: RequestUser, res, next) => {
    try {
        const { userinfo: jwt } = req.cookies;
        const payload: any = verify(jwt, "secret")
        if (!payload) return res.status(401).send({ message: "unauthentcated user" })
        const { id, ..._ } = payload;
        const repository = connection.getRepository(User);
        req.userinfo = await repository.findOne({
           where: {id: id},
            relations:['role','role.permisions']
        }) as User;
        next();
    } catch (error) {
        return res.status(401).send({ message: "unauthentcated user" })
    }
}
