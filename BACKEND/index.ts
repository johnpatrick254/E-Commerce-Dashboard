import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser"
import { exit } from "process";
import * as dotenv from "dotenv"
import path from "path";
import { connection } from "./ormconfig";
import { router } from "./src/routes/routes";
dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

connection.initialize().then(() => {
    const app = express();
    const PORT: number = 80;

    app.use(express.json());
    app.use(cookieParser())
    app.use(cors({
        origin: ["https://e-commerce-dashboard-rh94.vercel.app", "http://localhost:5173"],
        credentials: true
    }));

    router(app);

    app.listen(PORT, (): void => {
        console.log(`Server running on port: ${PORT}`)
    })
})
    .catch((error) => {
        console.log(error);
        exit(0)
    });


