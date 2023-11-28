import { Request, RequestHandler } from "express";
import { RegisterValidation, loginValidation, passwordValidation } from "../validators/register.validation";
import { connection } from "../../ormconfig";
import { User } from "../entities/user.entity";
import bcrypt from "bcryptjs"
import { sign} from "jsonwebtoken";
import { seedPerms } from "../seeders/role.seeder";



export const register: RequestHandler = async (req, res) => {
    const {password, password_confirm,...data } = req.body
    const { error } = RegisterValidation.validate(req.body);
    if (error) return res.status(400).send(error.details);
    if (password !== password_confirm) return res.status(400).send({ message: "Passwords Do not match" });
    const repository = connection.getRepository(User);
    const hashedPassword = await bcrypt.hash(password, 3)
    try {
        const { password, id, ...userData } = await repository.save({
            ...data,
            password:hashedPassword,
            role:{
                id:1
            }
        })
        res.status(200).send(userData)
    } catch (error) {
        res.status(403).send({
            err: error
        })
    }

}

export const login: RequestHandler = async (req, res) => {
    seedPerms()
    const { error } = loginValidation.validate(req.body)
    if (error) return res.json({ message: error.message })
    const { email, password } = req.body;
    const repository = connection.getRepository(User);
    const user = await repository.findOneBy({
        email: email
    })

    if (!user) return res.status(404).json({ message: "User does not exist" })

    if (await bcrypt.compare(password, user.password)) {
        const { password, ...userData } = user;
        const payload = { id: userData.id };
        const token = sign(payload, "secret")
        res.cookie(
            "userinfo",
            token, {
            httpOnly: true,
            sameSite:'None',
                secure: true,
            maxAge: 24 * 60 * 60 * 1000 //24HRS
        }
        )
        res.status(200).send({
            message: "success"
        })
    } else {

        return res.status(403).json({ message: "Invalid Credentials" })

    }

}


interface RequestUser extends Request {
    userinfo?: User;
}

export const authenticatedUser: RequestHandler = async (req: RequestUser, res) => {

    const user = req.userinfo
    if (!user) return res.status(401).send({ message: "unauthentcated user" })
    const { password, ...userData } = user

    res.status(200).send(userData);


}

export const logoutUser: RequestHandler = async (_req, res) => {
    res.cookie("userinfo", {
        maxAge: 0
    });
    res.status(200).send({ message: "logged off successfully" });
}

export const updateInfo: RequestHandler = async (req: RequestUser, res) => {
    try {
        const user = req.userinfo as User;
        const repository = connection.getRepository(User);
        if (!req.body) return res.status(403).json({ message: "no values provided" });
        const { password: dontUpdate, ...updates } = req.body;
        dontUpdate && console.log({ message: "password was not updated" })

        await repository.update(user.id, updates)
        const { password, ...userData } = await repository.findOneBy({ id: user.id }) as User;
        res.status(200).send(userData);

    } catch (err) {

        return res.status(502).json({ message: err });
    }


}
export const updatePassword: RequestHandler = async (req: RequestUser, res) => {
    try {
        const { error } = passwordValidation.validate(req.body);
        if (error) return res.status(403).json({ message: error.message });
        const { oldPassword, newPassword } = req.body
        const user = req.userinfo as User;
        const repository = connection.getRepository(User);
        if (!req.body) return res.status(403).json({ message: "no values provided" });
        const { password, ..._userData } = await repository.findOneBy({ id: user.id }) as User;
        if (await bcrypt.compare(oldPassword, password)) {
            repository.update(user.id, { password: await bcrypt.hash(newPassword, 10) });
        } else {
            return res.status(403).json({ message: "old password incorrect" });

        }

        res.status(200).send({ message: "success" });

    } catch (err) {

        return res.status(502).json({ message: err });
    }


}
