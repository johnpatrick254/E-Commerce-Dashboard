import  express  from "express";
import cors from "cors"
import dotenv from "dotenv"
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
    origin:"http://localhost:3000"
}));
const PORT:number | string = process.env.PORT || 3000;

app.listen(PORT ,():void=>{
console.log(`Server running on port: ${PORT}`)
})