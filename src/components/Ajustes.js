import React from "react";
import { postDeleteProductos, postDeleteHistorial } from "../services/apiCalls";
import smalltalk from "smalltalk";
export default function Ajustes() {
    const borrarHistorial = () => {
        try {
            smalltalk
                .confirm("Borrar!", "Seguro que desea eliminar el historial?")
                .then(async () => {
                    await postDeleteHistorial();
                });
        } catch (err) {
            console.log(err);
        }
    };
    const borrarProductos = () => {
        try {
            smalltalk
                .confirm("Borrar!", "Seguro que desea eliminar los productos?")
                .then(async () => {
                    await postDeleteProductos();
                });
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div>
            <button onClick={borrarHistorial}>Borrar Historial</button>
            <button onClick={borrarProductos}>Borrar Productos</button>
        </div>
    );
}
