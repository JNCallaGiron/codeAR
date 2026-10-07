import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { obtenerDonantes, insertarDonante } from "../services/serviceDonante.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import Proyecto from "../models/Proyectos.js";
import Organizacion from "../models/Organizaciones.js";
import Donante from "../models/Donantes.js";
import Donacion from "../models/Donaciones.js";
import Gasto from "../models/Gastos.js";

import {obtenerProyectosId, insertarProyecto, obtenerProyectos} from "../services/serviceProyecto.js";

//import {obtenerProyectos} from "./proyectosController.js";
const proyectosPath = path.join(__dirname, "../data/proyectos.json");
const organizacionesPath = path.join(__dirname, "../data/organizaciones.json");
const gastosPath = path.join(__dirname, "../data/gastos.json");
const donacionesPath = path.join(__dirname, "../data/donaciones.json");
const donantesPath = path.join(__dirname, "../data/donantes.json");



const renderHome = (req, res) => {
    res.render("index", { titulo: "Panel Principal - Backend" });
};

const renderProyectos =  async(req, res) => {
    try {
       
        const proyectos =await obtenerProyectos();
        res.render("proyectos", { proyectos });
    } catch (error) {
        res.status(500).send("Error al cargar proyectos");
    }
};

const renderCrearProyecto = (req, res) => {
    res.render("proyectosCrear");
};

const guardarProyectoDesdeVista = (req, res) => {
    try {
        const { idOrganizacion, nomProyecto, descripcion, saldo } = req.body;
        //const proyectos = JSON.parse(fs.readFileSync(proyectosPath, "utf-8"));
        const proyectos = obtenerProyectos();
        const nuevoId = proyectos.length > 0 ? Math.max(...proyectos.map(p => p.idProyecto)) + 1 : 1;
        const nuevoProyecto = new Proyecto(
            nuevoId,
            Number(idOrganizacion),
            nomProyecto,
            descripcion,
            { monto: Number(saldo), fecha: new Date() }
        );
        insertarProyecto(nuevoProyecto);
        res.redirect("/vistas/proyectos");
    } catch (error) {
        res.status(500).send("Error al guardar el proyecto");
    }
};

const renderProyectoDetalle = async(req, res) => {
    try {
        const id = req.params.id;
        const proyecto = await obtenerProyectosId(id);
        if (!proyecto) {
            return res.status(404).render("error", { mensaje: "Proyecto no encontrado" });
        }
        res.render("proyectoDetalle", { proyecto });
    } catch (error) {
        res.status(500).send("Error al cargar el detalle del proyecto");
    }
};

const renderOrganizaciones = (req, res) => {
    try {
        const organizaciones = JSON.parse(fs.readFileSync(organizacionesPath, "utf-8"));
        res.render("organizaciones", { organizaciones });
    } catch (error) {
        res.status(500).send("Error al cargar organizaciones");
    }
};

const renderCrearOrganizacion = (req, res) => {
    res.render("organizacionesCrear");
};

const guardarOrganizacionDesdeVista = (req, res) => {
    try {
        const { nombre, tipo, cuil, telefono, mail, direccion, responsable } = req.body;
        const organizaciones = JSON.parse(fs.readFileSync(organizacionesPath, "utf-8"));
        const nuevoId = organizaciones.length > 0 ? Math.max(...organizaciones.map(o => o.idOrganizacion)) + 1 : 1;
        const nuevaOrg = new Organizacion(
            nuevoId,
            nombre,
            tipo,
            cuil,
            telefono,
            mail,
            direccion,
            responsable
        );
        organizaciones.push(nuevaOrg);
        fs.writeFileSync(organizacionesPath, JSON.stringify(organizaciones, null, 2), "utf-8");
        res.redirect("/vistas/organizaciones");
    } catch (error) {
        res.status(500).send("Error al guardar la organización");
    }
};

const renderGastos = (req, res) => {
    try {
        const gastos = JSON.parse(fs.readFileSync(gastosPath, "utf-8"));
        res.render("gastos", { gastos });
    } catch (error) {
        res.status(500).send("Error al cargar gastos");
    }
};

const renderCrearGasto = (req, res) => {
    res.render("gastosCrear");
};

const guardarGastoDesdeVista = (req, res) => {
    try {
        const { idProyecto, descripcion, monto, fecha } = req.body;
        const gastos = JSON.parse(fs.readFileSync(gastosPath, "utf-8"));
        const nuevoId = gastos.length > 0 ? Math.max(...gastos.map(g => g.idGasto)) + 1 : 1;
        const nuevoGasto = new Gasto(
            nuevoId,
            Number(idProyecto),
            descripcion,
            Number(monto),
            fecha
        );
        gastos.push(nuevoGasto);
        fs.writeFileSync(gastosPath, JSON.stringify(gastos, null, 2), "utf-8");
        res.redirect("/vistas/gastos");
    } catch (error) {
        res.status(500).send("Error al guardar el gasto");
    }
};

const renderDonaciones = (req, res) => {
    try {
        const donaciones = JSON.parse(fs.readFileSync(donacionesPath, "utf-8"));
        res.render("donaciones", { donaciones });
    } catch (error) {
        res.status(500).send("Error al cargar donaciones");
    }
};

const renderCrearDonacion = (req, res) => {
    res.render("donacionesCrear");
};

const guardarDonacionDesdeVista = (req, res) => {
    try {
        const { monto, cbu, fecha, idProyecto, idDonante, idOrganizacion } = req.body;
        const donaciones = JSON.parse(fs.readFileSync(donacionesPath, "utf-8"));
        const nuevoId = donaciones.length > 0 ? Math.max(...donaciones.map(d => d.idDonacion)) + 1 : 1;
        const nuevaDonacion = new Donacion(
            nuevoId,
            Number(monto),
            cbu,
            fecha,
            Number(idProyecto),
            Number(idDonante),
            Number(idOrganizacion)
        );
        donaciones.push(nuevaDonacion);
        fs.writeFileSync(donacionesPath, JSON.stringify(donaciones, null, 2), "utf-8");
        res.redirect("/vistas/donaciones");
    } catch (error) {
        res.status(500).send("Error al guardar la donación");
    }
};

const renderDonantes = async   (req, res) => {
    try {
        // REEMPLAZO: En lugar de fs.readFileSync, llamamos a la función del servicio
        const donantes = await obtenerDonantes();
        res.render("donantes", { donantes });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al cargar donantes");
    }
};

const renderCrearDonante = (req, res) => {
    res.render("donantesCrear");
};

const guardarDonanteDesdeVista = async (req, res) => {
    try {
       await insertarDonante(req.body);
        res.redirect("/vistas/donantes");
    } catch (error) {
        //---------
        console.error("ERROR AL GUARDAR DONANTE:", error);
        res.status(500).send("Error al guardar el donante");
    }
};

export {
    renderHome,
    renderProyectos,
    renderCrearProyecto,
    guardarProyectoDesdeVista,
    renderProyectoDetalle,
    renderOrganizaciones,
    renderCrearOrganizacion,
    guardarOrganizacionDesdeVista,
    renderGastos,
    renderCrearGasto,
    guardarGastoDesdeVista,
    renderDonaciones,
    renderCrearDonacion,
    guardarDonacionDesdeVista,
    renderDonantes,
    renderCrearDonante,
    guardarDonanteDesdeVista
};
