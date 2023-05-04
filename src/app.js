import express, { json } from "express";
import morgan from "morgan";
import * as dotenv from "dotenv";
import requireToken from "./api/auth/controllers/requireToken";
import authRouter from "./api/auth/auth.router";
import eventosRouter from "./api/eventos/eventos.router";
import beneficiadoRouter from "./api/beneficiado/beneficiado.router";
import recomendationsRouter from "./api/recomendations/recomendations.router";
import cors from "cors";
import reportesRouter from "./api/reportes/reportes.router";

const app = express();

// App config
dotenv.config();
app.use(json());
app.use(cors());
app.use(morgan("dev"));

// App vars
app.set("port", process.env.PORT || 4000);

// App routes
app.use("/api/auth", authRouter);
app.use("/api/eventos", eventosRouter); // TODO: Requires token authentication
app.use("/api/beneficiado", requireToken, beneficiadoRouter);
app.use("/api/recomendations", recomendationsRouter); // TODO: Requires token authentication
app.use("/api/reportes", reportesRouter) // TODO: Requires token authentication

export default app;
