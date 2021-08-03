import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useHistory, useLocation } from "react-router-dom";
import smalltalk from "smalltalk";

export default function AgregarVendedor() {
    const [producto, setProducto] = useState();
    const productoRef = useRef();
    const cantidadRef = useRef();
    const marcaRef = useRef();
    const precioCompraRef = useRef();
    const precioVentaRef = useRef();
    const porcentajeGananciaRef = useRef();
    const location = useLocation();
    let history = useHistory();

    useEffect(() => {
        if (location.state.default) {
            setProducto(() => location.state.producto);
            productoRef.current.defaultValue = location.state.producto.producto;
            cantidadRef.current.defaultValue = location.state.producto.cantidad;
            marcaRef.current.defaultValue = location.state.producto.marca;
            precioCompraRef.current.defaultValue =
                location.state.producto.precioCompra;
            precioVentaRef.current.defaultValue =
                location.state.producto.precioVenta;
            porcentajeGananciaRef.current.defaultValue =
                location.state.producto.porcentajeGanancia;
            productoRef.current.focus();
        } else {
            setProducto({
                producto: "",
                precioVenta: "",
                cantidad: "",
                marca: "",
                precioCompra: "",
                porcentajeGanancia: "",
                _id: "",
            });
            productoRef.current.focus();
        } // eslint-disable-next-line
    }, []);
    function toFixedIfNecessary(value, dp) {
        return +parseFloat(value).toFixed(dp);
    }

    const handleChange = () => {
        const precioVenta =
            (porcentajeGananciaRef.current.value *
                precioCompraRef.current.value) /
                100 +
            parseInt(precioCompraRef.current.value);

        setProducto({
            _id: producto._id,
            producto: productoRef.current.value,
            cantidad: cantidadRef.current.value,
            marca: marcaRef.current.value,
            precioCompra: precioCompraRef.current.value,
            precioVenta: toFixedIfNecessary(precioVenta, 2),
            porcentajeGanancia: porcentajeGananciaRef.current.value,
        });
        precioVentaRef.current.value = toFixedIfNecessary(precioVenta, 2);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await location.state.funcion(producto);
            history.goBack();
        } catch (err) {
            console.log(err);
            await smalltalk.alert(
                "Error",
                "Ha ocurrido un error al agregar el producto."
            );
        }
    };

    const handleFocus = (e) => {
        e.target.select();
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
                <Label>Nombre del producto</Label>
                <Input
                    type="text"
                    placeholder="Producto"
                    onChange={handleChange}
                    ref={productoRef}
                    onFocus={handleFocus}
                    required
                />
                <Label>Marca o Proveedor</Label>
                <Input
                    type="text"
                    placeholder="Marca"
                    onChange={handleChange}
                    ref={marcaRef}
                    onFocus={handleFocus}
                    required
                />
                <Label>Stock</Label>
                <Input
                    type="number"
                    placeholder="Cantidad"
                    onChange={handleChange}
                    ref={cantidadRef}
                    onFocus={handleFocus}
                    required
                />
                <Label>Precio de compra</Label>
                <Input
                    type="number"
                    placeholder="Precio de compra"
                    onChange={handleChange}
                    ref={precioCompraRef}
                    onFocus={handleFocus}
                    required
                />
                <Label>Precio de venta</Label>
                <Input
                    type="number"
                    placeholder="Precio de venta"
                    onChange={handleChange}
                    ref={precioVentaRef}
                    k
                    disabled={true}
                    required
                />
                <Label>
                    Porcentaje de ganancia (Ingrese el valor en porcentaje sin
                    simbolo)
                </Label>
                <Input
                    type="number"
                    placeholder="Porcentaje de ganancia"
                    onChange={handleChange}
                    ref={porcentajeGananciaRef}
                    onFocus={handleFocus}
                    required
                />
                <Input
                    type="submit"
                    value={location.state.from}
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
const Label = styled.label`
    margin-top: 1vh;
    width: 80%;
    max-width: 500px;
`;

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
