import express from "express";
import {
    obtenerDonantes,
    obtenerDonantePorId,
    crearDonante,
    actualizarDonante,
    eliminarDonante
} from "../controllers/donantesController.js";

const router = express.Router();

router.get("/", obtenerDonantes);
router.get("/:id", obtenerDonantePorId);
router.post("/", crearDonante);
router.put("/:id", actualizarDonante);
router.delete("/:id", eliminarDonante);

export default router;
