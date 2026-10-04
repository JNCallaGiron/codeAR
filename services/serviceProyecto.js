import { connectDB } from "../config/db.js";
import mongoose from "mongoose";
import Proyecto from "../models/ProyectosMdb.js";


//Servicio para obtener un proyecto por su ID desde la base de datos MongoDB
async function obtenerProyectos() {
     try {
    connectDB();
    const db = mongoose.connection.client.db("pfo");
    const proyectos = await db
      .collection("proyectos")
      .find({})
      .toArray();

    return proyectos;
  } catch (error) {
    console.error("Error al obtener los proyectos:", error);
  } finally {
    //await mongoose.disconnect();
  }
}

//Servicio para obtener un proyecto por su ID desde la base de datos MongoDB
async function obtenerProyectosId (id) {
  try {
    await connectDB();

    const db = mongoose.connection.client.db("pfo");
   const proyectos = db.collection("proyectos");
      const proyecto = await proyectos.findOne({ idProyecto:Number(id) });

    if (!proyecto) {
      throw new Error("Proyecto no encontrado");
    }
    return proyecto;
  } catch (error) {
    console.error("Error al obtener el proyecto por ID:", error);
    throw error;
  }
};

//funcion para insertar datos en la base de datos y se manda por parametro la tabla y los datos a insertar
async function insertarProyecto(datos) {
    connectDB();
    const db = mongoose.connection.client.db("pfo");
    const proyectos = db.collection("proyectos");
    const nuevo = proyectos.insertOne(datos);
  if (!nuevo) {
    throw new Error("Error al insertar el proyecto");
  } 
  return nuevo;
}

export { obtenerProyectosId, insertarProyecto,obtenerProyectos};
