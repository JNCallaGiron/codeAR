import express from "express";
import {
    obtenerTodos,
    obtenerProyectoPorId,
    crearProyecto,
    updateProyecto,
    deleteProyecto
} from "../controllers/proyectosController.js";

const router = express.Router();

router.get("/", obtenerTodos);
router.get("/:id", obtenerProyectoPorId);
router.post("/", crearProyecto);
router.put("/:id", updateProyecto);
router.delete("/:id", deleteProyecto);

export default router;
