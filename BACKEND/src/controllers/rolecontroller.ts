import { Request, Response } from "express-serve-static-core";
import { connection } from "../../ormconfig"
import { Role } from "../entities/role.entity";

export const roles = async(_req:Request,res:Response)=>{
 const roleRep = connection.getRepository(Role);
 res.send(await roleRep.find())
}
export const creatRoles = async(req:Request,res:Response)=>{
    const {name,permisions}:{name:string,permisions: number[]} = req.body
 const roleRep = connection.getRepository(Role);
 const newRole =await roleRep.save({
    name:name,
    permisions:permisions.map(id=>({id}))
 })
 res.status(200).send(newRole)
}

export const getRolesByID = async(req:Request,res:Response)=>{
    const {id} = req.params
 const roleRep = connection.getRepository(Role);
 const newRole =await roleRep.findOne({
    where:{id:+id},
    relations:['permisions']
 })
 res.status(200).send(newRole)
}

export const updateRoles = async(req:Request,res:Response)=>{
    const {id} = req.params
    const {name,permisions}:{name:string,permisions:number[]} = req.body
 const roleRep = connection.getRepository(Role);
 const newRole =await roleRep.save({
    id:+id,
    name:name,
    permisions:permisions.map(id =>({id}))
 })

 res.status(200).send(newRole)
}
export const deleteRoles = async(req:Request,res:Response)=>{
    const {id} = req.params
 const roleRep = connection.getRepository(Role);
 await roleRep.delete(id)

 res.status(200).send({message:'success'})
}