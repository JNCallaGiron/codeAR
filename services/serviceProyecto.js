import { connectDB } from "../config/db.js";
import mongoose from "mongoose";
import Proyecto from "../models/ProyectosMdb.js";

//Servicio para obtener un proyecto por su ID desde la base de datos MongoDB
async function obtenerProyectos() {
  try {
    const proyectos = await Proyecto.find();
        return proyectos;
  } catch (error) {
    console.error("Error al obtener los proyectos:", error);
  } finally {
    //await mongoose.disconnect();
  }
}

//Servicio para obtener un proyecto por su ID desde la base de datos MongoDB
async function obtenerProyectosId(id) {
  try {
       const proyecto = await Proyecto.findOne({ idProyecto: Number(id) });
    if (!proyecto) {
      throw new Error("Proyecto no encontrado");
    }
    return proyecto;
  } catch (error) {
    console.error("Error al obtener el proyecto por ID:", error);
    throw error;
  }
}

//funcion para insertar datos en la base de datos y se manda por parametro la tabla y los datos a insertar
async function insertarProyecto(datos) {
   const { idOrganizacion, nomProyecto, descripcion, saldo } = datos;

  if (!idOrganizacion || !nomProyecto || !descripcion) {
    const err = new Error("Faltan campos obligatorios");
    err.status = 400;
    throw err;
  }

  // Verificar que haya conexión
  if (Proyecto.db.readyState !== 1) {
    throw new Error("MongoDB no está conectado (readyState !== 1)");
  }

  const ultimo = await Proyecto.findOne()
    .sort({ idProyecto: -1 })
    .select("idProyecto")
    .lean();

  const idProyecto = ultimo ? ultimo.idProyecto + 1 : 1;

  const nuevo = await Proyecto.create({
    idProyecto,
    idOrganizacion: Number(idOrganizacion),
    nomProyecto: String(nomProyecto).trim(),
    descripcion: String(descripcion).trim(),
    saldo: [{ monto: Number(saldo) || 0, fecha: new Date() }],
  });

  console.log("Proyecto guardado:", nuevo._id, "idProyecto:", nuevo.idProyecto);
  return nuevo.toObject();
}
export { obtenerProyectosId, insertarProyecto, obtenerProyectos };
