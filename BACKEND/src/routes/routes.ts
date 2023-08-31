import { Router } from "express";
import { authenticatedUser, login, logoutUser, register, updateInfo, updatePassword } from "../controllers/authcontroller";
import { authMiddlware } from "../middlewares/auth.middleware";
import { createUsers, deleteUsers, fetchAllUsers, fetchOneUsers, updateUsers } from "../controllers/usercontroller";

export const router =(router:Router)=>{
    router.post("/api/register",register)
    router.post("/api/login",login)
    router.get("/api/user",authMiddlware,authenticatedUser)
    router.post("/api/logout",authMiddlware,logoutUser)
    router.put("/api/user/info",authMiddlware,updateInfo)
    router.patch("/api/user/info",authMiddlware,updatePassword)
    
    router.get("/api/users",authMiddlware,fetchAllUsers)
    router.post("/api/users",authMiddlware,createUsers)
    router.get("/api/users/:id",authMiddlware,fetchOneUsers)
    router.put("/api/users/:id",authMiddlware,updateUsers)
    router.delete("/api/users/:id",authMiddlware,deleteUsers)
} ;
