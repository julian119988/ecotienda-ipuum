import { api } from "../api.js";

export const productos = async () => {
    try {
        const response = await api.get("/productos");
        return response.data;
    } catch (error) {
        return error;
    }
};
