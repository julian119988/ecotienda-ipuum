import mongoose from "mongoose";
const { Schema } = mongoose;

const ventasSchema = new Schema({
    nombre: String,
    productos: [Schema.Types.Mixed], // por [{Producto, cantidad vendida, monto individual}, {Producto, cantidad vendida, monto individual}]
    monto: Number, // Monto Total
    fecha: { type: Date, default: Date.now },
    feria: Boolean,
    porcentajeGanancia: Number,
});

const VentasModel = mongoose.model("ventas", ventasSchema);

export default VentasModel;
