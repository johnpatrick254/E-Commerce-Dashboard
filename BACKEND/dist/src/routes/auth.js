"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const authcontroller_1 = require("../controllers/authcontroller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (router) => {
    router.post("/api/register", authcontroller_1.register);
    router.post("/api/login", authcontroller_1.login);
    router.get("/api/user", auth_middleware_1.authMiddlware, authcontroller_1.authenticatedUser);
    router.post("/api/logout", auth_middleware_1.authMiddlware, authcontroller_1.logoutUser);
    router.put("/api/user/info", auth_middleware_1.authMiddlware, authcontroller_1.updateInfo);
    router.patch("/api/user/info", auth_middleware_1.authMiddlware, authcontroller_1.updatePassword);
};
exports.router = router;
