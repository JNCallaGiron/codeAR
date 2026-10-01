import express from "express";
import {
    obtenerOrganizaciones,
    obtenerOrganizacionPorId,
    crearOrganizacion,
    actualizarOrganizacion,
    eliminarOrganizacion
} from "../controllers/organizacionesController.js";

const router = express.Router();

router.get("/", obtenerOrganizaciones);
router.get("/:id", obtenerOrganizacionPorId);
router.post("/", crearOrganizacion);
router.put("/:id", actualizarOrganizacion);
router.delete("/:id", eliminarOrganizacion);

export default router;
