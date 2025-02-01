import express from "express";
import { authRoute } from "./routes/auth";
import { reviewRoute } from "./routes/review";
import cookieParser  from "cookie-parser"

const app = express();

app.use(express.json());
app.use(cookieParser());

const port = 3000 

app.use('/api/v1/auth',authRoute);
app.use('/api/v1/reviews', reviewRoute);

app.listen(port, ()=>{
    console.log("server is runing");
})