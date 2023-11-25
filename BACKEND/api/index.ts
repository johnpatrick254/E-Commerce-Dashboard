import  express  from "express";
import cors from "cors"
import { connection } from "../ormconfig";
import { router } from "../src/routes/routes";
import cookieParser from "cookie-parser"
import { exit } from "process";
import * as dotenv from "dotenv"
import path from "path";
dotenv.config({path:path.resolve(__dirname, '..','.env')});

if(!connection.initialize())exit();

const app = express();
const PORT:number= +process.env.PORT || 3000 ; 

app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin:"*",
    credentials:true
}));

router(app);
 
app.listen(PORT ,():void=>{
console.log(`Server running on port: ${PORT}`)
})
