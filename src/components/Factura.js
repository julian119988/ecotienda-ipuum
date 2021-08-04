import React, { useEffect } from "react";
import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    Image,
} from "@react-pdf/renderer";
import QRCode from "qrcode.react";
const Factura = ({ carrito, show }) => {
    const styles = StyleSheet.create({
        page: {
            flexDirection: "row",
            backgroundColor: "#E4E4E4",
        },
        section: {
            margin: 10,
            padding: 10,
            flexGrow: 1,
        },
    });
    useEffect(() => {
        console.log(carrito);
    }, [show]);
    return <h1>Hola desde factura</h1>;
};
export default Factura;
