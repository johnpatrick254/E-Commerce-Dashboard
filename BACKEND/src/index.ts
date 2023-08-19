import  express  from "express";
import cors from "cors"
import { router } from "./routes/auth";

const app = express();
const PORT:number | string = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({
    origin:"http://localhost:3000"
}));
router(app);
app.listen(PORT ,():void=>{
console.log(`Server running on port: ${PORT}`)
})