import "dotenv/config";
import "./database/conectdb.js";
import cookieParser from "cookie-parser";
import express  from 'express';
import authRouter from './routes/auth.route.js';
import linkRouter from "./routes/link.route.js";
import redirectRouter from './routes/redirect.js';
import cors from 'cors';

const app = express();

const whileList = [process.env.ORIGIN1,process.env.ORIGIN2];

//app.use(
  //  cors({
    //   origin: [process.env.ORIGIN1],
    //})
// );

app.use(
    cors({
        origin: function(origin,callback){
           if(whileList.includes(origin)){
                return callback(null,origin)
            }
        return callback
            ("Error de CORS" + origin + "no autorizado!");
        },
    })
);

app.use(express.json());
app.use(cookieParser());

//ejemplo back redirect (opcinal)
app.use('/',redirectRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/links", linkRouter);

//solo para el ejemplo del  login/token
//app.use(express.static('public'))

const PORT = process.env.PORT ||5000;
app.listen(PORT,() => console.log("lol http://localhost:" + PORT));


