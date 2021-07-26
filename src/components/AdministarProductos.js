import React, { useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import styled from "styled-components";
import {
    deleteProducto,
    getProductos,
    updateProducto,
    uploadProducto,
} from "../services/apiCalls";
import smalltalk from "smalltalk";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { useHistory } from "react-router";

export default function AdministarProductos() {
    const [productos, setProductos] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();

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

    const handleDeleteClick = async (id) => {
        try {
            if (await deleteProducto(id)) await fetchProductos();
        } catch (err) {
            await smalltalk.alert(
                "Error!",
                "No se ha podido eliminar el producto."
            );
        }
    };

    const handleKeypress = (e) => {
        //it triggers by pressing the enter key
        if (e.keyCode === 13) {
            e.target.click();
        }
    };

    const editarCampo = async (campo, id, current, literal, opt) => {
        let tipo = "number";
        let seguir = true;
        let response;
        if (campo === "Producto" || campo === "Marca") tipo = "string";
        try {
            while (seguir) {
                response = await smalltalk.prompt(
                    campo,
                    `Esta editando el siguiente campo: ${campo}`,
                    current
                );
                seguir = checkType(tipo, response);
            }
            if (tipo === "number") {
                if (campo === "Cantidad") {
                    await updateProducto({
                        _id: id,
                        [literal]: parseInt(response),
                    });
                } else if (campo === "Precio de compra") {
                    await updateProducto({
                        _id: id,
                        [literal]: parseInt(response),
                        precioVenta:
                            (parseInt(response) * parseInt(opt)) / 100 +
                            parseInt(response),
                    });
                } else {
                    await updateProducto({
                        _id: id,
                        [literal]: parseInt(response),
                        precioVenta:
                            (parseInt(opt) * parseInt(response)) / 100 +
                            parseInt(opt),
                    });
                }
            } else {
                await updateProducto({ _id: id, [literal]: response });
            }
            await fetchProductos(busqueda);
        } catch (err) {
            console.log(err);
        }
    };

    const checkType = (tipo, value) => {
        if (tipo === "number") {
            if (parseInt(value)) {
                return false;
            }
        } else {
            if (value) {
                return false;
            }
        }
        return true;
    };

    return (
        <Container>
            <UploadProductoButton
                onClick={() =>
                    history.push({
                        pathname: "/agregar-producto",
                        state: {
                            funcion: uploadProducto,
                            from: "Agregar producto",
                            default: false,
                        },
                    })
                }
            >
                Agregar Producto
            </UploadProductoButton>
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
                        No se encontraron resultados, escribe "all" para mostrar
                        todos los productos.
                    </Center>
                ) : (
                    <Center>
                        Empieza una busqueda o escribe "all" para mostrar todos
                        los productos.
                    </Center>
                )
            ) : (
                <>
                    <Label>
                        Se puede editar solo un campo ya sea
                        producto/marca/cantidad/precio compra/precio venta
                        haciendo click sobre el mismo. O en el boton de editar
                        se pueden editar todos los campos.
                    </Label>
                    <Table>
                        <Thead>
                            <Tr>
                                <Th colSpan="9">Productos</Th>
                            </Tr>
                            <Tr>
                                <Th style={{ width: "70px" }}>_id</Th>
                                <Th>Producto</Th>
                                <Th>Marca</Th>
                                <Th>Cantidad</Th>
                                <Th>Precio compra</Th>
                                <Th>Precio venta</Th>
                                <Th>Porcentaje de ganancia</Th>
                                <Th short>Editar</Th>
                                <Th short>Eliminar</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {productos.map((product) => {
                                const {
                                    _id,
                                    producto,
                                    cantidad,
                                    marca,
                                    precioCompra,
                                    precioVenta,
                                    porcentajeGanancia,
                                } = product;
                                return (
                                    <Tr key={_id}>
                                        <Td short>{_id}</Td>
                                        <Td
                                            onClick={() =>
                                                editarCampo(
                                                    "Producto",
                                                    _id,
                                                    producto,
                                                    "producto"
                                                )
                                            }
                                            hoverable
                                        >
                                            {producto}
                                        </Td>
                                        <Td
                                            onClick={() =>
                                                editarCampo("Marca", _id, marca)
                                            }
                                            hoverable
                                        >
                                            {marca}
                                        </Td>
                                        <Td
                                            onClick={() =>
                                                editarCampo(
                                                    "Cantidad",
                                                    _id,
                                                    cantidad,
                                                    "cantidad"
                                                )
                                            }
                                            hoverable
                                        >
                                            {cantidad}
                                        </Td>
                                        <Td
                                            onClick={() =>
                                                editarCampo(
                                                    "Precio de compra",
                                                    _id,
                                                    precioCompra,
                                                    "precioCompra",
                                                    porcentajeGanancia
                                                )
                                            }
                                            hoverable
                                        >
                                            {precioCompra}
                                        </Td>
                                        <Td>{precioVenta}</Td>
                                        <Td
                                            style={{ width: "180px" }}
                                            onClick={() =>
                                                editarCampo(
                                                    "Porcentaje de ganancia",
                                                    _id,
                                                    porcentajeGanancia,
                                                    "porcentajeGanancia",
                                                    precioCompra
                                                )
                                            }
                                            hoverable
                                        >
                                            {porcentajeGanancia}
                                        </Td>
                                        <Td short>
                                            <Button
                                                onClick={() =>
                                                    history.push({
                                                        pathname:
                                                            "/agregar-producto",
                                                        state: {
                                                            funcion:
                                                                updateProducto,
                                                            from: "Editar producto",
                                                            default: true,
                                                            producto: product,
                                                        },
                                                    })
                                                }
                                            >
                                                <EditIcon
                                                    style={{ fill: "white" }}
                                                />
                                            </Button>
                                        </Td>
                                        <Td short>
                                            <Button
                                                delete
                                                onClick={() =>
                                                    handleDeleteClick(_id)
                                                }
                                                onKeyPress={handleKeypress}
                                            >
                                                <DeleteIcon
                                                    style={{ fill: "white" }}
                                                />
                                            </Button>
                                        </Td>
                                    </Tr>
                                );
                            })}
                        </Tbody>
                    </Table>
                </>
            )}
        </Container>
    );
}

const Label = styled.label``;

const Container = styled.div`
    width: 100%;
    padding: 5vh 10vh 5vh 10vh;
    display: flex;
    flex-direction: column;
`;
const Center = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    font-size: 25px;
`;

const UploadProductoButton = styled.button`
    background-color: tomato;
    border: none;
    border-radius: 2vh;
    cursor: pointer;
    padding: 2vh 4vh 2vh 4vh;
    color: white;
    outline: none;
    width: max-content;
    &:hover {
        background-color: orange;
    }
    &:focus {
        background-color: orange;
    }
`;

const InputSearch = styled.input`
    margin: 16px 16px 16px 0;
    width: 250px;
    height: 30px;
    padding-left: 5px;
`;

const Table = styled.table`
    margin-top: 16px;
    border-collapse: collapse;
    display: block;
    overflow-x: auto;
`;

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
const Tr = styled.tr``;

const Button = styled.button`
    width: 100%;
    height: 100%;
    cursor: pointer;
    margin: 0;
    padding: 0;
    border: none;
    outline: none;
    color: white;
    ${(props) =>
        props.delete
            ? "background-color: tomato;"
            : "background-color: deepskyblue;"}
    &:hover {
        ${(props) =>
            props.delete
                ? "background-color: orange;"
                : "background-color: royalblue;"}
    }
    &:focus {
        ${(props) =>
            props.delete
                ? "background-color: orange;"
                : "background-color: royalblue;"}
    }
`;
