
import  express  from "express";
import cors from "cors"
import { connection } from "../config/database";
import { router } from "./routes/routes";
import cookieParser from "cookie-parser"
import { exit } from "process";


if(!connection.initialize())exit();

const app = express();
const PORT:number | string = process.env.VITE_PORT || 3000 ;

app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}));

router(app);

app.listen(PORT ,():void=>{
console.log(`Server running on port: ${PORT}`)
})