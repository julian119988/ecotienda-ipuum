import React, { useEffect, useState, useLayoutEffect } from "react";
import styled from "styled-components";
import { getProductos, postVenta } from "../services/apiCalls";
import Loader from "react-loader-spinner";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import smalltalk from "smalltalk";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import DeleteIcon from "@material-ui/icons/Delete";

export default function Vender(props) {
    const [productos, setProductos] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [carrito, setCarrito] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        if (busqueda) {
            setIsLoading(true);
        } else {
            setIsLoading(false);
        }
        const delayDebounceFn = setTimeout(() => {
            if (busqueda) {
                fetchProductos(busqueda);
            } else {
                setProductos([]);
            }
        }, 200);
        return () => clearTimeout(delayDebounceFn);
    }, [busqueda]);

    const fetchProductos = async (busqueda) => {
        setIsLoading(false);
        const response = await getProductos(busqueda);
        setProductos(response);
    };
    const handleChange = (event) => {
        setBusqueda(event.target.value);
    };
    const handleClick = async (producto) => {
        let seguir = true;
        let isInCarrito = false;
        while (seguir) {
            const response = await smalltalk.prompt(
                "Cantidad",
                "Ingrese la cantidad",
                "1"
            );
            if (
                parseInt(response) <= 0 ||
                parseInt(response) > producto.cantidad ||
                !parseInt(response)
            ) {
                console.log("invalido");
            } else {
                seguir = false;
                carrito.forEach((item) => {
                    if (item._id === producto._id) isInCarrito = true;
                });
                if (isInCarrito) {
                    smalltalk.alert(
                        "Error",
                        "Ese producto ya se encuentra en el carrito, editelo o eliminelo antes de agregarlo nuevamente."
                    );
                } else {
                    setCarrito([
                        ...carrito,
                        {
                            _id: producto._id,
                            producto: producto.producto,
                            precioCompra: producto.precioCompra,
                            precioVenta: producto.precioVenta,
                            cantidad: parseInt(response),
                            porcentajeGanancia: producto.porcentajeGanancia,
                            marca: producto.marca,
                        },
                    ]);
                }
            }
        }
    };
    const calcularTotal = () => {
        let tempTotal = 0;
        carrito.forEach((item) => {
            tempTotal += parseInt(item.cantidad) * parseInt(item.precioVenta);
        });
        setTotal(tempTotal);
    };

    useEffect(() => {
        calcularTotal();
    }, [JSON.stringify(carrito)]);

    const deleteFromCarrito = async (id) => {
        await smalltalk.confirm(
            "Borrar",
            "Seguro que quieres borrar este item del carrito?"
        );
        const tempCarritoArray = carrito;
        carrito.forEach((item, index) => {
            if (item._id === id) {
                tempCarritoArray.splice(index, 1);
            }
        });
        setCarrito(tempCarritoArray);
        calcularTotal();
    };

    const editPrecioFromCarrito = async (id) => {
        const tempCarritoArray = carrito;
        carrito.forEach(async (item, index) => {
            if (item._id === id) {
                smalltalk
                    .prompt(
                        "Editar",
                        `Cambiar el porcentaje de ganancia? (Precio de compra: ${item.precioCompra})`,
                        item.porcentajeGanancia
                    )
                    .then((res) => {
                        tempCarritoArray[index].porcentajeGanancia =
                            parseInt(res);
                        tempCarritoArray[index].precioVenta =
                            (parseInt(res) * item.precioCompra) / 100 +
                            item.precioCompra;
                        setCarrito(tempCarritoArray);
                        calcularTotal();
                    });
            }
        });
    };

    const editCantidadFromCarrito = (id) => {
        const tempCarritoArray = carrito;
        let seguir = true;
        carrito.forEach(async (item, index) => {
            if (item._id === id) {
                while (seguir) {
                    const res = await smalltalk.prompt(
                        "Editar",
                        `Cambiar el cantidad?`,
                        item.cantidad
                    );
                    if (parseInt(res) <= 0 || !parseInt(res)) {
                        console.log("invalido");
                    } else {
                        tempCarritoArray[index].cantidad = parseInt(res);
                        setCarrito(tempCarritoArray);
                        calcularTotal();
                        seguir = false;
                    }
                }
            }
        });
    };

    const handleVenta = async () => {
        try {
            const res = await postVenta(carrito, props.isFeria, props.user);
            if (res === true) {
                await smalltalk.alert("Exito", "Se ha realizado la compra");
                fetchProductos(busqueda);
                setCarrito([]);
            } else {
                console.log("No se ha podido realiar la compra");
            }
        } catch (err) {
            smalltalk.alert("Error", "No se ha podido realiar la compra");
            console.log(err);
        }
    };
    return (
        <Container>
            <Productos>
                <InputSearch
                    type="text"
                    onChange={handleChange}
                    placeholder="Buscar un producto..."
                    autoFocus
                />
                {isLoading ? (
                    <Center>
                        <Loader
                            type="ThreeDots"
                            color="tomato"
                            height={100}
                            width={100}
                        />
                    </Center>
                ) : productos[0] === undefined ? (
                    busqueda ? (
                        <Center>
                            No se encontraron resultados, escribe "all" para
                            mostrar todos los productos.
                        </Center>
                    ) : (
                        <Center>
                            Empieza una busqueda o escribe "all" para mostrar
                            todos los productos.
                        </Center>
                    )
                ) : (
                    <Table>
                        <Thead>
                            <Tr>
                                <Th colSpan="5">Productos</Th>
                            </Tr>
                            <Tr>
                                <Th>Producto</Th>
                                <Th>Marca</Th>
                                <Th>Stock</Th>
                                <Th>Precio venta</Th>
                                <Th short>Agregar</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {productos.map((product) => {
                                const {
                                    _id,
                                    producto,
                                    cantidad,
                                    marca,
                                    precioVenta,
                                    porcentajeGanancia,
                                } = product;
                                return (
                                    <Tr
                                        hoverable
                                        key={_id}
                                        onClick={() => handleClick(product)}
                                    >
                                        <Td hoverable>{producto}</Td>
                                        <Td hoverable>{marca}</Td>
                                        <Td hoverable>{cantidad}</Td>
                                        <Td hoverable>{precioVenta}</Td>
                                        <Td hoverable short>
                                            <Button add>
                                                <AddCircleOutlineIcon />
                                            </Button>
                                        </Td>
                                    </Tr>
                                );
                            })}
                        </Tbody>
                    </Table>
                )}
            </Productos>
            <Carrito>
                {carrito[0] === undefined ? (
                    "Carrito vacio"
                ) : (
                    <>
                        <Table>
                            <Thead>
                                <Tr>
                                    <Th colSpan="6">Carrito</Th>
                                </Tr>
                                <Tr>
                                    <Th>Producto</Th>
                                    <Th>Marca</Th>
                                    <Th>Cantidad</Th>
                                    <Th>Precio unitario</Th>
                                    <Th>Precio parcial</Th>
                                    <Th short>Eliminar</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {carrito.map((product, index) => {
                                    const {
                                        _id,
                                        producto,
                                        cantidad,
                                        marca,
                                        precioVenta,
                                        precioCompra,
                                        porcentajeGanancia,
                                    } = product;
                                    return (
                                        <Tr key={_id}>
                                            <Td>{producto}</Td>
                                            <Td>{marca}</Td>
                                            <Td
                                                hoverable
                                                onClick={() =>
                                                    editCantidadFromCarrito(_id)
                                                }
                                            >
                                                {cantidad}
                                            </Td>
                                            <Td
                                                hoverable
                                                onClick={() =>
                                                    editPrecioFromCarrito(
                                                        _id,
                                                        precioCompra,
                                                        porcentajeGanancia
                                                    )
                                                }
                                            >
                                                {precioVenta}
                                            </Td>
                                            <Td
                                                hoverable
                                                onClick={() =>
                                                    editPrecioFromCarrito(
                                                        _id,
                                                        precioCompra,
                                                        porcentajeGanancia
                                                    )
                                                }
                                            >
                                                {parseInt(cantidad) *
                                                    parseInt(precioVenta)}
                                            </Td>

                                            <Td
                                                short
                                                onClick={() =>
                                                    deleteFromCarrito(_id)
                                                }
                                            >
                                                <Button delete>
                                                    <DeleteIcon />
                                                </Button>
                                            </Td>
                                        </Tr>
                                    );
                                })}
                            </Tbody>
                            <Tfoot>
                                <Tr>
                                    <Td colSpan="4">Total</Td>
                                    <Td colSpan="2">{total}</Td>
                                </Tr>
                                <Tr>
                                    <Td
                                        colSpan="6"
                                        style={{ margin: "0", padding: "0" }}
                                    >
                                        <RealizarCompra
                                            onClick={() => handleVenta()}
                                        >
                                            RealizarCompra <ShoppingCartIcon />
                                        </RealizarCompra>
                                    </Td>
                                </Tr>
                            </Tfoot>
                        </Table>
                    </>
                )}
            </Carrito>
        </Container>
    );
}

const RealizarCompra = styled.button`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    border: none;
    outline: none;
    align-items: center;
    justify-content: center;
    margin: 0;
    padding: 0;
    color: white;
    background-color: #23c123;
    cursor: pointer;
    &:hover {
        background-color: #229e22;
    }
`;
const Button = styled.div`
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    ${(props) => props.add && "background-color: #23c123;"}
    ${(props) => props.delete && "background-color: tomato;"}
    ${(props) => props.edit && "background-color: deepskyblue;"}
    &:hover {
        ${(props) => props.add && "background-color: #229e22;"}
        ${(props) => props.delete && "background-color: orange;"}
    ${(props) => props.edit && "background-color: royalblue;"}
    }
`;
const Center = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    font-size: 25px;
`;
const InputSearch = styled.input`
    margin: 16px 16px 16px 0;
    width: 250px;
    height: 30px;
    padding-left: 5px;
`;
const Container = styled.div`
    width: 100%;
    height: 80vh;
    display: flex;
    flex-direction: column;
`;
const Productos = styled.div`
    width: 100%;
    padding: 1vh;
    margin-bottom: 2vh;
`;
const Carrito = styled.div`
    width: 100%;
    border-top: 3px tomato solid;
    padding: 1vh;
`;
const Table = styled.table`
    margin-top: 16px;
    border-collapse: collapse;
    display: block;
    overflow-x: auto;
`;
const Tfoot = styled.tfoot``;
const Thead = styled.thead``;
const Tbody = styled.tbody``;
const Th = styled.th`
    color: white;
    background-color: tomato;
    height: 3vh;
    border: 1px solid #ddd;
    word-break: break-word;
    min-width: 100px;
    ${(props) => props.short && "width: 100px;"}
`;
const Td = styled.td`
    height: 3vh;
    border: 1px solid #ddd;
    word-break: break-word;
    padding-left: 5px;
    max-width: 150px;
    text-align: center;
    background-color: inherit;
    ${(props) => props.short && "width: 100px; margin: 0; padding: 0;"}
    ${(props) => !props.hoverable && `background-color: aliceblue;`}
    &:hover {
        ${(props) =>
            props.hoverable
                ? `cursor: pointer;
        background-color: gray;
        color: white;`
                : "cursor: default;"}
    }
`;
const Tr = styled.tr`
    ${(props) => props.hoverable && "background-color: white;cursor: pointer;"}
    &:hover {
        ${(props) => props.hoverable && "background-color: gray; color:white;"}
    }
`;
