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
export const uploadProducto = async (producto, user) => {
    try {
        const response = await api.post("/productos", { producto, user });
        return response.data;
    } catch (err) {
        return err;
    }
};
export const updateProducto = async (producto, productoAntiguo) => {
    console.log(productoAntiguo, producto);
    try {
        const response = await api.patch(`/productos/${producto._id}`, {
            producto,
            productoAntiguo,
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
export const getFraccionamiento = async (
    month = null,
    year = null,
    responsable = null
) => {
    try {
        const response = await api.get("/fraccionamiento", {
            params: { responsable, month, year },
        });
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
export const deleteFraccionamiento = async (id, idHistorial) => {
    try {
        await smalltalk.confirm(
            "Confirmar",
            "Seguro quiere eliminar este fraccionamiento?"
        );
        await api.delete("/fraccionamiento", { data: { id, idHistorial } });
        return true;
    } catch (err) {
        return err.message;
    }
};

//Ventas
export const postVenta = async (productos, isFeria, user) => {
    try {
        await smalltalk.confirm("Confirmar", "Realizar compra?");
        await api.post("/ventas", {
            productos,
            isFeria,
            user,
        });
        return true;
    } catch (err) {
        console.log(err.response);
        return false;
    }
};

//Historial
export const getHistorial = async (query) => {
    try {
        const response = await api.get("/historial", { params: query });
        return response.data;
    } catch (err) {
        console.log(err);
        return err;
    }
};
//Apertura y cierre de caja
export const postAperturaCaja = async (monto, user) => {
    try {
        const response = await api.post("/aperturaCaja", {
            data: { monto, user },
        });
        return response.data;
    } catch (err) {
        console.log(err.response);
        return err;
    }
};
export const postCierreCaja = async (monto, user) => {
    try {
        const response = await api.post("/cierreCaja", {
            data: { monto, user },
        });
        return response.data;
    } catch (err) {
        console.log(err.response);
        return err;
    }
};

//Borrar bases de datos
export const postDeleteProductos = async () => {
    try {
        const response = await api.post("/deleteProductos");
        return response.data;
    } catch (err) {
        console.log(err);
        return err;
    }
};
export const postDeleteHistorial = async () => {
    try {
        const response = await api.post("/deleteHistorial");
        return response.data;
    } catch (err) {
        console.log(err);
        return err;
    }
};

export const postNotaDeCredito = async ({ total, carrito, user }) => {
    try {
        const response = await api.post("/nota-de-credito", {
            total,
            carrito,
            user,
        });
        return response.data;
    } catch (err) {
        console.log(err);
        return err;
    }
};
