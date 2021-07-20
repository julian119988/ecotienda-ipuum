import { api } from "../api.js";

export const getProductos = async () => {
    try {
        const response = await api.get("/productos");
        return response.data;
    } catch (error) {
        return error;
    }
};
export const uploadProducto = async () => {
    try {
        const response = await api.get("/uploadProducto");
        return response.data;
    } catch (err) {
        return err;
    }
};

export const uploadTodo = async (datos) => {
    const { titulo, descripcion, persona } = datos;
    try {
        const response = await api.post("/todo", {
            titulo: titulo,
            descripcion: descripcion,
            persona: persona,
        });
        return response.data;
    } catch (err) {
        return err;
    }
};

export const getTodo = async () => {
    try {
        const response = await api.get("/todo");
        return response.data;
    } catch (err) {
        return err;
    }
};

export const deleteTodo = async (id) => {
    try {
        const response = await api.delete("/todo", { data: { id: id } });
        return response.data;
    } catch (err) {
        return err;
    }
};
