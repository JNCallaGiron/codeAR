import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Proyecto from "../models/Proyectos.js";
import mongoose from "mongoose";
import {obtenerProyectosId, insertarProyecto, obtenerProyectos} from "../services/serviceProyecto.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const rutaArchivo = path.join(__dirname, "../data/proyectos.json");


// función leer archivo
const leerProyectos = () => {
    const data = fs.readFileSync(rutaArchivo, "utf-8");

    return JSON.parse(data);

};
// función leer archivo desde MongoDB
// const leerProyectosMdb = async () => {
//     try {
//         return await obtenerDatos("proyectos");
     
//     } catch (error) {
//         console.error("Error al leer proyectos desde MongoDB:", error);
//         return [];
//     }
// };


// función guardar archivo
const guardarProyectos = (proyectos) => {

    fs.writeFileSync(
        rutaArchivo,
        JSON.stringify(proyectos, null, 2)
    );

};


// GET ALL
const  obtenerTodos = async(req, res) => {
    try {
        const proyectos = await obtenerProyectos();
        res.json(proyectos);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener los proyectos" });
    }
    
};
// GET BY ID
const obtenerProyectoPorId = async (req, res) => {
    const id = req.params.id;
    try {
        const proyecto = await obtenerProyectosId(id);
        if (!proyecto) {
            return res.status(404).json({ mensaje: "Proyecto no encontrado" });
        }
        return res.json(proyecto);
    } catch (error) {
        return res.status(500).json({ mensaje: "Error al obtener el proyecto" });
    }
};

// CREATE
const crearProyecto = async (req, res) => {
    try {
        const nuevoProyecto = await insertarProyecto(req.body);
        res.status(201).json({ mensaje: "Proyecto creado exitosamente", proyecto: nuevoProyecto });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al crear el proyecto" });
    }
};


// UPDATE
const actualizarProyecto = (req, res) => {

    const proyectos = leerProyectos();

    const id = parseInt(req.params.id);

    const proyecto = proyectos.find(p => p.idProyecto === id);

    if (!proyecto) {

        return res.status(404).json({
            mensaje: "Proyecto no encontrado"
        });

    }

    const {idOrganizacion, nomProyecto, descripcion, saldo } = req.body;
    proyecto.idOrganizacion = idOrganizacion ?? proyecto.idOrganizacion;
    proyecto.nomProyecto = nomProyecto ?? proyecto.nomProyecto;
    proyecto.descripcion = descripcion ?? proyecto.descripcion;
    proyecto.saldo = saldo ?? proyecto.saldo;

    guardarProyectos(proyectos);

    res.json({
        mensaje: "Proyecto actualizado",
        proyecto
    });

};


// DELETE
const eliminarProyecto = (req, res) => {
    try {
        const id = parseInt(req.params.id);

        const proyectos = leerProyectos();
        const proyecto = proyectos.find(p => p.idProyecto === id);

        if (!proyecto) {
            return res.status(404).json({
                mensaje: "Proyecto no encontrado"
            });
        }

        // Validación de integridad referencial (gastos o donaciones asociados)
        const gastosFile = path.join(__dirname, "../data/gastos.json");
        const donacionesFile = path.join(__dirname, "../data/donaciones.json");

        const gastos = fs.existsSync(gastosFile) ? JSON.parse(fs.readFileSync(gastosFile, "utf-8")) : [];
        const donaciones = fs.existsSync(donacionesFile) ? JSON.parse(fs.readFileSync(donacionesFile, "utf-8")) : [];

        const tieneGastos = gastos.some(g => Number(g.idProyecto) === id);
        const tieneDonaciones = donaciones.some(d => Number(d.idProyecto) === id);

        if (tieneGastos || tieneDonaciones) {
            return res.status(409).json({
                mensaje: "No se puede eliminar el proyecto porque posee gastos o donaciones asociados"
            });
        }

        const nuevosProyectos = proyectos.filter(p => p.idProyecto !== id);
        guardarProyectos(nuevosProyectos);

        res.json({
            mensaje: "Proyecto eliminado"
        });
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al eliminar el proyecto"
        });
    }
};


export {
    obtenerTodos, 
    obtenerProyectoPorId,  
    crearProyecto,
    actualizarProyecto,
    eliminarProyecto

};
