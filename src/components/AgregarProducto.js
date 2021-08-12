import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useHistory, useLocation } from "react-router-dom";
import smalltalk from "smalltalk";

export default function AgregarVendedor() {
    const [producto, setProducto] = useState();
    const [isConcesion, setIsConcesion] = useState(false);
    const [firstRender, setFirstRender] = useState(false);
    const [opacity, setOpacity] = useState("opacity: 0;");
    const productoRef = useRef();
    const cantidadRef = useRef();
    const marcaRef = useRef();
    const precioCompraRef = useRef();
    const precioVentaRef = useRef();
    const porcentajeGananciaRef = useRef();
    const location = useLocation();
    let history = useHistory();

    useEffect(() => {
        setFirstRender(true);
        if (location.state.default) {
            setProducto(() => location.state.producto);
            productoRef.current.defaultValue =
                location.state.producto.producto.producto;
            cantidadRef.current.defaultValue =
                location.state.producto.producto.cantidad;
            marcaRef.current.defaultValue =
                location.state.producto.producto.marca;
            precioCompraRef.current.defaultValue =
                location.state.producto.producto.precioCompra;
            precioVentaRef.current.defaultValue =
                location.state.producto.producto.precioVenta;
            porcentajeGananciaRef.current.defaultValue =
                location.state.producto.producto.porcentajeGanancia;
            location.state.producto.producto.concesion && setIsConcesion(true);
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
                concesion: false,
            });
            productoRef.current.focus();
        } // eslint-disable-next-line
    }, []);
    function toFixedIfNecessary(value, dp) {
        return +parseFloat(value).toFixed(dp);
    }
    useEffect(() => {
        if (firstRender) {
            handleChange();
        }
        setTimeout(
            () => setOpacity("opacity: 1; transition: all 0.3s ease-out;"),
            600
        );
    }, [isConcesion]);

    const handleChange = (event) => {
        if (!event) {
            setProducto({
                _id: producto._id,
                producto: productoRef.current.value,
                cantidad: cantidadRef.current.value,
                marca: marcaRef.current.value,
                precioCompra: precioCompraRef.current.value,
                precioVenta: precioVentaRef.current.value,
                porcentajeGanancia: porcentajeGananciaRef.current.value,
                concesion: isConcesion,
            });
        } else {
            if (
                event.target.name === "compra" ||
                event.target.name === "ganancia"
            ) {
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
                    concesion: isConcesion,
                });
                precioVentaRef.current.value = toFixedIfNecessary(
                    precioVenta,
                    2
                );
            } else {
                const porcentajeGanancia =
                    ((precioVentaRef.current.value -
                        precioCompraRef.current.value) *
                        100) /
                    precioCompraRef.current.value;
                setProducto({
                    _id: producto._id,
                    producto: productoRef.current.value,
                    cantidad: cantidadRef.current.value,
                    marca: marcaRef.current.value,
                    precioCompra: precioCompraRef.current.value,
                    precioVenta: precioVentaRef.current.value,
                    porcentajeGanancia: toFixedIfNecessary(
                        porcentajeGanancia,
                        2
                    ),
                    concesion: isConcesion,
                });
                porcentajeGananciaRef.current.value = toFixedIfNecessary(
                    porcentajeGanancia,
                    2
                );
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await location.state.funcion(producto, location.state.producto); // Falta agregar concesion a la llamada y el sv
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
                    name="compra"
                    onChange={handleChange}
                    ref={precioCompraRef}
                    onFocus={handleFocus}
                    step="0.01"
                    required
                />
                <Label>Precio de venta</Label>
                <Input
                    type="number"
                    placeholder="Precio de venta"
                    onChange={handleChange}
                    ref={precioVentaRef}
                    name="venta"
                    step="0.01"
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
                    name="ganancia"
                    step="0.01"
                    required
                />
                <Label>Producto de conceción</Label>

                <SwitchDiv
                    id="switchDiv"
                    onClick={() => {
                        setOpacity("opacity: 0;");
                        setIsConcesion(!isConcesion);
                    }}
                >
                    <SwitchText id="switchText" opacity={opacity}>
                        {isConcesion ? "De consecion" : "Normal"}
                    </SwitchText>
                    <SwitchThumb position={isConcesion}></SwitchThumb>
                </SwitchDiv>
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
const SwitchDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 80%;
    height: 5vh;
    border-radius: 5vh;
    max-width: 500px;
    background-color: tomato;
    cursor: pointer;
    margin: 1vh;
`;

const SwitchThumb = styled.div`
    position: absolute;
    background-color: white;
    border-radius: 50%;
    width: 4vh;
    height: 4vh;
    top: 0.5vh;
    transition: all 0.6s ease-in-out;
    ${(props) => {
        const switchWidth = document.getElementById("switchDiv");
        return !props.position
            ? `transform: translateX(calc(-${
                  switchWidth && switchWidth.clientWidth
              }px / 2 + 2.5vh));`
            : `transform: translateX(calc(${
                  switchWidth && switchWidth.clientWidth
              }px / 2 - 2.5vh));`;
    }}
`;
const SwitchText = styled.p`
    color: white;
    font-size: 20px;
    top: 1.5vh;
    margin: 0;
    ${(props) => props.opacity}
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
