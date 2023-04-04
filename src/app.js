import express, { json } from "express";
import morgan from "morgan";
import eventosRouter from "./api/eventos/eventos.router";

const app = express();

// App config
app.use(json());
app.use(morgan("dev"));

// App vars
app.set("port", process.env.PORT || 4000);

// App routes
app.use("/api/eventos", eventosRouter);

export default app;
