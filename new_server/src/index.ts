import express from "express";
import { authRoute } from "./routes/auth";

const app = express();

app.use(express.json());

const port = 3000 

app.use('/api/v1/auth',authRoute);

app.listen(port, ()=>{
    console.log("server is runing");
})