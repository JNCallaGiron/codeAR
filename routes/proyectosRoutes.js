import express from "express";
import {
    obtenerTodos,
    obtenerProyectoPorId,
    crearProyecto,
    actualizarProyecto,
    eliminarProyecto
} from "../controllers/proyectosController.js";

const router = express.Router();

router.get("/", obtenerTodos);
router.get("/:id", obtenerProyectoPorId);
router.post("/", crearProyecto);
// router.put("/:id", actualizarProyecto);
// router.delete("/:id", eliminarProyecto);

export default router;
