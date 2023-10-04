import { Request, Response } from "express";
import multer from "multer";
import { extname } from "path";


export const uploadImgae = (req:Request,res:Response) =>{
       const storage = multer.diskStorage(
        {
            destination:'./uploads'
             ,
            filename(_req,file,callback){
                const randomname = Math.random().toString(20).substring(2,12);
                return callback(null,`${randomname}${extname(file.originalname)}`)
            }
        }      
    )

    var upload = multer({
        storage:storage
    }).single('image');

    upload(req,res,(err)=>{
        if(err){
            return res.status(400).send({message:err})
        }
        res.status(200).send({
            url:"http://localhost:3000/api/upload/" + `${req.file?.filename}`
        })
    })
}