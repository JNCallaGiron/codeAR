import mongoose from "mongoose";

const donanteSchema = new mongoose.Schema({
    idDonante: { 
        type: Number, 
        required: true,
        unique: true
    },
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    dni: { type: String, required: true, unique: true },
    telefono: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    monto: { type: Number, required: true },
    fecha: { type: Date, required: true }
});

export default mongoose.model('Donante', donanteSchema);