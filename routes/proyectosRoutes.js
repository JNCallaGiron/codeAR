import express from "express";
import {
    obtenerProyectos,
    crearProyecto,
    actualizarProyecto,
    eliminarProyecto
} from "../controllers/proyectosController.js";
import{obtenerProyectosId} from "../services/serviceProyecto.js";
const router = express.Router();

router.get("/", obtenerProyectos);
router.get("/:id", obtenerProyectosId);
router.post("/", crearProyecto);
router.put("/:id", actualizarProyecto);
router.delete("/:id", eliminarProyecto);

export default router;
