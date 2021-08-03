import mongoose from "mongoose";
const { Schema } = mongoose;

const vendedoresSchema = new Schema({
    nombre: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: true,
    },
    antiguedad: Date,
    password: { type: String, required: true },
    rol: { type: String, required: true },
});

const VendedoresModel = mongoose.model("vendedores", vendedoresSchema);

export default VendedoresModel;
