import { Response, Request } from "express";
import { User } from "../entities/user.entity";
import { connection } from "../../config/ormconfig";
import { hash } from "bcryptjs"

export const fetchAllUsers = async (req: Request, res: Response) => {
    try {
        let pageNumber:number = parseInt(req.query.page as string || "1")
        const take =15;
        const repository = connection.getRepository(User);
        const {"0":users,"1":total} = await repository.findAndCount(
           {
               take:take,
               skip:(pageNumber - 1) * take,
            relations:['role']
           },
        )

        res.status(200).send({
            data:users.map(user => {
            const { password, ...data } = user;
            return data
            }),
            meta:{
                total:total,
                page:pageNumber,
                lastpage:Math.ceil(total/take)
            }
    });

    } catch (err) {

        return res.status(502).json({ message: err });
    }

}
export const createUsers = async (req: Request, res: Response) => {
    try {
        const { role_id,password_confirm:setPassword, ...body } = req.body;
        const password = await hash(setPassword, 10);
        const repository = connection.getRepository(User);
        const { password: hashedPass,password_confirm, ...user } = await repository.save({
            ...body,
            password: password,
            role:{
                id:role_id
            }
        })
        res.status(200).send(user);
    } catch (err) {
        console.log(err);
        return res.status(502).json({ message: err });
    }

}

export const fetchOneUsers = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const repository = connection.getRepository(User);
        const fetchedData =  await repository.findOne({relations:['role'],where:{id:+id}} ) as User
        if(!fetchedData) return res.status(404).send({message:"user not found"})
        const { password, ...users } = fetchedData;
        res.status(200).send(users);

    } catch (err) {
        console.log(err);
        return res.status(502).json({ message: err });
    }

}

export const updateUsers = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const {role_id,password:dontUpdate,...body} = req.body
        const repository = connection.getRepository(User);
         await repository.update(id,{
            ...body,
            role:{
                id:role_id
            }
        }) 
        const {password, ...users} = await repository.findOne(
            {where:{id:+id},relations:['role']}
            
            ) as User 
        res.status(200).send(users);

    } catch (err) {
        console.log(err);
        return res.status(502).json({ message: err });
    }
}
export const deleteUsers = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;        
        const repository = connection.getRepository(User);
         await repository.delete(id) 
         res.status(200).send(null);
       

    } catch (err) {
        console.log(err);
        return res.status(502).json({ message: err });
    }
}

export const totalUsers = async(_req:Request,res:Response)=>{
    const results = await connection.query("SELECT COUNT(*) as data FROM user;")
    res.status(200).send(results); 
}