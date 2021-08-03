import mongoose from "mongoose";
const { Schema } = mongoose;

const aperturaCajaSchema = new Schema({
    nombre: String,
    abrio: String,
    fecha: Date,
    dinero: Number,
});

const AperturaCajaModel = mongoose.model("apertura-caja", aperturaCajaSchema);

export default AperturaCajaModel;
