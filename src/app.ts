import express from "express";
import cors from "cors";
import { routes } from "./routes";
import { errorHandling } from "./middlewares/errorHandling";

const app = express();

// CORS configuration
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Servidor está rodando" });
});

// Registrar rotas com prefixo /api
app.use("/api", routes);
app.use(errorHandling);

export { app };