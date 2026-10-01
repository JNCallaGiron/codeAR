import express from "express";
import {
    obtenerGastos,
    obtenerGastoPorId,
    crearGasto,
    actualizarGasto,
    eliminarGasto
} from "../controllers/gastosController.js";

const router = express.Router();

router.get("/", obtenerGastos);
router.get("/:id", obtenerGastoPorId);
router.post("/", crearGasto);
router.put("/:id", actualizarGasto);
router.delete("/:id", eliminarGasto);

export default router;
