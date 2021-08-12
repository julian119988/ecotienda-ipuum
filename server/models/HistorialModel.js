import mongoose from "mongoose";
const { Schema } = mongoose;

const historialSchema = new Schema(
    {
        tipo: String,
        descripcion: String,
        responsable: String,
        opcional: String,
        total: Number,
        concesion: Boolean,
    },
    { timestamps: true }
);

const HistorialModel = mongoose.model("historial", historialSchema);

export default HistorialModel;
