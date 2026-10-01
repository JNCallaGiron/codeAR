import express from "express";
import {
    obtenerDonaciones,
    obtenerDonacionPorId,
    crearDonacion,
    actualizarDonacion,
    eliminarDonacion
} from "../controllers/donacionesController.js";

const router = express.Router();

router.get("/", obtenerDonaciones);
router.get("/:id", obtenerDonacionPorId);
router.post("/", crearDonacion);
router.put("/:id", actualizarDonacion);
router.delete("/:id", eliminarDonacion);

export default router;
