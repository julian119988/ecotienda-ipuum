import mongoose from "mongoose";
const { Schema } = mongoose;

const vendedoresSchema = new Schema({
    nombre: String,
    antiguedad: Date,
});

const VendedoresModel = mongoose.model("vendedores", vendedoresSchema);

module.exports = VendedoresModel;
