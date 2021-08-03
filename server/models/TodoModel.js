import mongoose from "mongoose";
const { Schema } = mongoose;

const todoSchema = new Schema({
    titulo: String,
    descripcion: String,
    fecha: { type: Date, default: Date.now },
    persona: String,
});

const TodoModel = mongoose.model("todo", todoSchema);

export default TodoModel;
