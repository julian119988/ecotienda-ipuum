import { api } from "../api.js";
import smalltalk from "smalltalk";

//Apicalls Home/Tareas(todos)
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
        await smalltalk.confirm("Confirmar", "Seguro quiere borrar esta nota?");
        const response = await api.delete("/todo", { data: { id: id } });
        return response.data;
    } catch (err) {
        return err;
    }
};

//Apicalls Vendedores
export const uploadVendedor = async (vendedor) => {
    try {
        const response = await api.post("/vendedor", { data: vendedor });
        return response.data;
    } catch (err) {
        console.log(err);
        return err;
    }
};
export const deleteVendedor = async (id) => {
    try {
        await smalltalk.confirm(
            "Confirmar",
            "Seguro quiere eliminar a este vendedor?"
        );
        const response = await api.delete("/vendedor", { data: { id: id } });
        return response.data;
    } catch (err) {
        return err;
    }
};
export const getVendedores = async () => {
    try {
        const response = await api.get("/vendedor");
        return response.data;
    } catch (err) {
        console.log(err);
        return err;
    }
};
export const checkPass = async (nombre, password) => {
    try {
        const response = await api.post(`/vendedor/${nombre}`, {
            data: { nombre, password },
        });
        return response.data;
    } catch (err) {
        return true;
    }
};

//Apicalls Productos/Stock
export const getProductos = async (busqueda) => {
    try {
        const response = await api.get(`/productos/${busqueda}`);
        return response.data;
    } catch (error) {
        return error;
    }
};
export const uploadProducto = async (producto) => {
    try {
        const response = await api.post("/productos", producto);
        return response.data;
    } catch (err) {
        return err;
    }
};
export const updateProducto = async (producto) => {
    try {
        const response = await api.patch(`/productos/${producto._id}`, {
            producto,
        });
        return response;
    } catch (err) {
        return err;
    }
};
export const deleteProducto = async (id) => {
    try {
        await smalltalk.confirm(
            "Confirmar",
            "Seguro quiere eliminar este producto?"
        );
        await api.delete("/productos", { data: { id: id } });
        return true;
    } catch (err) {
        return false;
    }
};

//Apicalls Fraccionamiento
export const getFraccionamiento = async () => {
    try {
        const response = await api.get("/fraccionamiento");
        return response.data;
    } catch (err) {
        return false;
    }
};
export const postFraccionamiento = async (fraccionamiento) => {
    try {
        return await api.post("/fraccionamiento", fraccionamiento);
    } catch (err) {
        return false;
    }
};
export const deleteFraccionamiento = async (id) => {
    try {
        await smalltalk.confirm(
            "Confirmar",
            "Seguro quiere eliminar este fraccionamiento?"
        );
        await api.delete("/fraccionamiento", { data: { id: id } });
        return true;
    } catch (err) {
        return false;
    }
};
