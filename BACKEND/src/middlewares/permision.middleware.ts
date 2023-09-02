import { Request, Response } from "express"
import { User } from "../entities/user.entity";

interface RequestUser extends Request {
    userinfo?: User;
}
export const permisionMiddleware = async (access:string) =>{
    return async (req:RequestUser,res:Response,next:Function)=>{
        const userinfo = req.userinfo;
        const method = req.method;
        const permisions = userinfo?.role.permisions
        if(method === "get"){
                        
            if(!permisions?.some(p=>{
                return (p.name === `view_${access}`) ||(p.name === `edit_${access}`)
            })){            
                return res.status(401).send({message:"user doesn't have permision to process request"})
            }
        }else{
            if(!permisions?.some(p=>(p.name === `edit_${access}`))){                
               return res.status(401).send({message:"user doesn't have permision to process request"})
            }
            next()
        }
        }
         
}
