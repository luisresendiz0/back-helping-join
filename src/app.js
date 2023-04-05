import express, { json } from "express";
import morgan from "morgan";
import * as dotenv from "dotenv";
import eventosRouter from "./api/eventos/eventos.router";
import authRouter from "./api/auth/auth.router";
import requireToken from "./api/auth/controllers/requireToken";

const app = express();

// App config
dotenv.config();
app.use(json());
app.use(morgan("dev"));

// App vars
app.set("port", process.env.PORT || 4000);

// App routes
app.use("/api/auth", authRouter);
app.use("/api/eventos", requireToken, eventosRouter);

export default app;
