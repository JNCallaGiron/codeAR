//import "dotenv/config";
import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

dotenv.config();

 connectDB();
 
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3200;

import proyectosRoutes from "./routes/proyectosRoutes.js";
import organizacionesRoutes from "./routes/organizacionesRoutes.js";
import gastosRoutes from "./routes/gastosRoutes.js";
import donacionesRoutes from "./routes/donacionesRoutes.js";
import donantesRoutes from "./routes/donantesRoutes.js";
import vistasRoutes from "./routes/vistasRoutes.js";

// Configuración del motor de plantillas Pug
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Usar rutas API JSON
app.use("/proyectos", proyectosRoutes);
app.use("/organizaciones", organizacionesRoutes);
app.use("/gastos", gastosRoutes);
app.use("/donaciones", donacionesRoutes);
app.use("/donantes", donantesRoutes);

// Usar rutas de vistas Pug
app.use("/vistas", vistasRoutes);

// Ruta principal
app.get("/", (req, res) => {
    res.render("index", { titulo: "SumarImpacto - Panel Principal" });
});

app.listen(PORT, () => {
    console.log("Servidor corriendo en puerto " + PORT);
});
