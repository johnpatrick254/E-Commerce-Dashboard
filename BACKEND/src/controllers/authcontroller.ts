import { RequestHandler } from "express";
import { RegisterValidation } from "../validators/register.validation";



export const register:RequestHandler=(req,res)=>{
    const body =req.body
   const {error} = RegisterValidation.validate(body);
   if(error) return res.status(400).send(error.details);
    if(body.password !== body.password_confirm) return res.status(400).send({message:"Passwords Do not match"});
   res.send(body)
}
