import React, { useRef, useState } from "react";
import styled from "styled-components";
import { uploadProducto } from "../services/apiCalls";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useHistory } from "react-router-dom";
import smalltalk from "smalltalk";

export default function AgregarVendedor() {
    const [producto, setProducto] = useState({
        producto: "",
        precioVenta: "",
        cantidad: "",
        marca: "",
        precioCompra: "",
        porcentajeGanancia: "",
    });
    const productoRef = useRef();
    const cantidadRef = useRef();
    const marcaRef = useRef();
    const precioCompraRef = useRef();
    const precioVentaRef = useRef();
    const porcentajeGananciaRef = useRef();

    let history = useHistory();

    const handleChange = () => {
        setProducto({
            producto: productoRef.current.value,
            cantidad: cantidadRef.current.value,
            marca: marcaRef.current.value,
            precioCompra: precioCompraRef.current.value,
            precioVenta: precioVentaRef.current.value,
            porcentajeGanancia: (
                (precioVentaRef.current.value / precioCompraRef.current.value) *
                    100 -
                100
            ).toFixed(2),
        });
        porcentajeGananciaRef.current.value = (
            (precioVentaRef.current.value / precioCompraRef.current.value) *
                100 -
            100
        ).toFixed(2);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await uploadProducto(producto);
            history.goBack();
        } catch (err) {
            console.log(err);
            await smalltalk.alert(
                "Error",
                "Ha ocurrido un error al agregar el producto."
            );
        }
    };

    return (
        <Container>
            <GoBackBar onClick={() => history.goBack()}>
                <ArrowBackIcon
                    style={{
                        height: "100%",
                        width: "10vh",
                        marginRight: "auto",
                        fill: "white",
                        textAlign: "center",
                    }}
                />
            </GoBackBar>
            <Form onSubmit={handleSubmit}>
                <Input
                    type="text"
                    placeholder="Producto"
                    onChange={handleChange}
                    ref={productoRef}
                    required
                />
                <Input
                    type="text"
                    placeholder="Marca"
                    onChange={handleChange}
                    ref={marcaRef}
                    required
                />
                <Input
                    type="number"
                    placeholder="Cantidad"
                    onChange={handleChange}
                    ref={cantidadRef}
                    required
                />
                <Input
                    type="number"
                    placeholder="Precio de compra"
                    onChange={handleChange}
                    ref={precioCompraRef}
                    required
                />
                <Input
                    type="number"
                    placeholder="Precio de venta"
                    onChange={handleChange}
                    ref={precioVentaRef}
                    required
                />
                <Input
                    type="text"
                    placeholder="Porcentaje de ganancia"
                    onChange={handleChange}
                    ref={porcentajeGananciaRef}
                    disabled={true}
                    required
                />
                <Input
                    type="submit"
                    value="Agregar producto"
                    style={{
                        color: "white",
                        backgroundColor: "tomato",
                        cursor: "pointer",
                    }}
                />
            </Form>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const Form = styled.form`
    display: flex;
    flex-direction: column;
    margin: 10vh;
    width: 100%;
    align-items: center;
`;

const Input = styled.input`
    width: 80%;
    max-width: 500px;
    margin: 1vh;
    height: 5vh;
    border-radius: 5vh;
    border: 2px solid tomato;
    padding: 1vh;
    outline: none;
`;

const GoBackBar = styled.div`
    width: 100%;
    height: 10vh;
    background-color: tomato;
    color: white;
    cursor: pointer;
    &:hover {
        background-color: wheat;
    }
    &:focus {
        background-color: wheat;
    }
`;
