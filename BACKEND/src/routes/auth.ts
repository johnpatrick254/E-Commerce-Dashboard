import { Router } from "express";
import { register } from "../controllers/authcontroller";

export const router =(router:Router)=>{
    router.post("/api/register",register)
} ;
