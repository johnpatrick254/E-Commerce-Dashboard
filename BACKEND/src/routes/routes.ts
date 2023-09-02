import { Router,static as staticRoute } from "express";
import {login, logoutUser, register, updateInfo, updatePassword } from "../controllers/authcontroller";
import { authMiddlware } from "../middlewares/auth.middleware";
import { createUsers, deleteUsers, fetchAllUsers, fetchOneUsers, updateUsers } from "../controllers/usercontroller";
import { Permisions } from "../controllers/permisioncontroller";
import { creatRoles, deleteRoles, getRolesByID, roles, updateRoles } from "../controllers/rolecontroller";
import { createProduct, deleteProduct, fetchAllProducts, fetchOneProduct, updateProduct } from "../controllers/productcontoller";
import { seedPerms } from "../seeders/role.seeder";
import { seedProducts } from "../seeders/product.seeder";
import { uploadImgae } from "../controllers/imagecontroller";
import { seedOrders } from "../seeders/order.seeder";
import { chartData, exportCSV, fetchAllOrders } from "../controllers/ordercontroller";
import { permisionMiddleware } from "../middlewares/permision.middleware";


export const router =async (router:Router)=>{
     ///////////////////
    //SEED ROUTES//////
    //////////////////
    router.get("/seed/permisions",seedPerms)
    router.get("/seed/products",seedProducts)
    router.get("/seed/orders",seedOrders)

     ///////////////////
    //API ROUTES  //////
    //////////////////
  
    router.post("/api/register",register)
    router.post("/api/login",login)
    router.post("/api/logout",authMiddlware,logoutUser)
    router.put("/api/user/info",authMiddlware,updateInfo)
    router.patch("/api/user/info",authMiddlware,updatePassword)
    router.post("/api/upload",authMiddlware,uploadImgae)
        
    ///////////////////
    //USER ROUTES/////
    //////////////////
    router.get("/api/users",authMiddlware,await permisionMiddleware('users'),fetchAllUsers)
    router.post("/api/users",authMiddlware,await permisionMiddleware('users'),createUsers)
    router.get("/api/users/:id",authMiddlware,await permisionMiddleware('users'),fetchOneUsers)
    router.put("/api/users/:id",authMiddlware,await permisionMiddleware('users'),updateUsers)
    router.delete("/api/users/:id",authMiddlware,await permisionMiddleware('users'),deleteUsers)

     //////////////////
    //ROLES ROUTES////
    //////////////////
    router.get("/api/permisions",authMiddlware,await permisionMiddleware('roles'),Permisions)
    router.get("/api/roles",authMiddlware,await permisionMiddleware('roles'),roles)
    router.get("/api/roles/:id",authMiddlware,await permisionMiddleware('roles'),getRolesByID)
    router.post("/api/roles",authMiddlware,await permisionMiddleware('roles'),creatRoles)
    router.put("/api/roles/:id",authMiddlware,await permisionMiddleware('roles'),updateRoles)
    router.delete("/api/roles/:id",authMiddlware,await permisionMiddleware('roles'),deleteRoles)
    
    //////////////////
    //PRODUCT ROUTES///
    //////////////////
    router.get("/api/products",authMiddlware,await permisionMiddleware('products'),fetchAllProducts)
    router.post("/api/products",authMiddlware,await permisionMiddleware('products'),createProduct)
    router.get("/api/products/:id",authMiddlware,await permisionMiddleware('products'),fetchOneProduct)
    router.put("/api/products/:id",authMiddlware,await permisionMiddleware('products'),updateProduct)
    router.delete("/api/products/:id",authMiddlware,await permisionMiddleware('products'),deleteProduct)
    router.use('/api/upload',authMiddlware,staticRoute('./uploads'))

    //////////////////await permisionMiddleware('products'),
    //ORDERS ROUTES//
    //////////////////
    router.get("/api/orders",authMiddlware,await permisionMiddleware('products'),fetchAllOrders)
    router.post("/api/export",authMiddlware,await permisionMiddleware('products'),exportCSV)
    router.get("/api/chart",authMiddlware,await permisionMiddleware('products'),chartData)
    
} ;
