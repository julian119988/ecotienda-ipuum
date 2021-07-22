import mongoose from "mongoose";
const { Schema } = mongoose;

const fraccionamientoSchema = new Schema({
    nombre: String,
    descripcion: String,
    ganancia: Number,
    fecha: Date,
    cantidad: Number,
});

const FraccionamientoModel = mongoose.model(
    "fraccionamiento",
    fraccionamientoSchema
);

module.exports = FraccionamientoModel;
