import { Request, Response } from "express-serve-static-core";
import { connection } from "../../ormconfig"
import { Permision } from "../entities/permision.entity"

export const Permisions = async(_req:Request,res:Response)=>{
 const permRep = connection.getRepository(Permision);
 res.send(await permRep.find())
}