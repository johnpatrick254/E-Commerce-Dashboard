import { Router } from "express";
import { authenticatedUser, login, logoutUser, register, updateInfo, updatePassword } from "../controllers/authcontroller";
import { authMiddlware } from "../middlewares/auth.middleware";

export const router =(router:Router)=>{
    router.post("/api/register",register)
    router.post("/api/login",login)
    router.get("/api/user",authMiddlware,authenticatedUser)
    router.post("/api/logout",authMiddlware,logoutUser)
    router.put("/api/user/info",authMiddlware,updateInfo)
    router.patch("/api/user/info",authMiddlware,updatePassword)
} ;
