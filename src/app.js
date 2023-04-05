import express, { json } from "express";
import morgan from "morgan";
import * as dotenv from "dotenv";
import requireToken from "./api/auth/controllers/requireToken";
import authRouter from "./api/auth/auth.router";
import eventosRouter from "./api/eventos/eventos.router";
import beneficiadoRouter from "./api/beneficiado/beneficiado.router";

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
app.use("/api/beneficiado", requireToken, beneficiadoRouter);

export default app;
