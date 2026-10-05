import mongoose from "mongoose";
const proyectoSchema = new mongoose.Schema({
    idProyecto: { type: Number, required: true },
    idOrganizacion: { type: Number, required: true },
    nomProyecto: { type: String, required: true },
    descripcion: { type: String, required: true },
    saldo: [{
        monto:{ 
            type: Number, 
            required: false
        },
        fecha: {
            type: Date, 
            required: false 
        }
    }],
},  
{ collection: 'proyectosMdbs' });


export default mongoose.model('ProyectosMdb', proyectoSchema);