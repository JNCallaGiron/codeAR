import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Proyecto from "../models/Proyectos.js";
import mongoose from "mongoose";


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
const  obtenerProyectos = async(req, res) => {

    const proyectos = await leerProyectosMdb();
    return proyectos;

};


// GET BY ID
// const obtenerProyectoPorId = async(id) => {
    
//     const proyecto = await consultarPorId("proyectos",id);
    
//     if (!proyecto) {

//         return res.status(404).json({
//             mensaje: "Proyecto no encontrado"
//         });

//     }

//     res.json(proyecto);

// };


// CREATE
const crearProyecto = (req, res) => {

    const proyectos = leerProyectos();

    const { idProyecto, idOrganizacion, nomProyecto, descripcion, saldo } = req.body;
    let nuevoId = proyectos.length > 0 ? proyectos[proyectos.length - 1].idProyecto + 1 : 1;
    const nuevoProyecto = new Proyecto(nuevoId, idOrganizacion, nomProyecto, descripcion, saldo);

    proyectos.push(nuevoProyecto);

    guardarProyectos(proyectos);

    res.status(201).json({
        mensaje: "Proyecto creado",
        proyecto: nuevoProyecto
    });

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

    obtenerProyectos,
    
    crearProyecto,
    actualizarProyecto,
    eliminarProyecto

};
