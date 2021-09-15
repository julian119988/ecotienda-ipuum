import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { getHistorial, getVendedores } from "../services/apiCalls";

export default function Historial() {
    const [historial, setHistorial] = useState([]);
    const [vendedores, setVendedores] = useState([]);
    const [formattedHistory, setFormattedHistory] = useState([]);
    const tipoRef = useRef();
    const fechaRef = useRef();
    const vendedorRef = useRef();
    const yearRef = useRef();

    useEffect(() => {
        fetchVendedores();
    }, []);
    useEffect(() => {
        historialFormateado(); // eslint-disable-next-line
    }, [historial]);

    const fetchVendedores = async () => {
        setVendedores(await getVendedores());
    };

    const handleClick = async () => {
        let tempTipo;
        let tempFecha;
        const tempVendedor =
            vendedorRef.current.value === "Todos"
                ? "todos"
                : vendedorRef.current.value;
        const fecha = fechaRef.current.value;
        const tipo = tipoRef.current.value;
        if (tipo === "Movimientos de productos") {
            tempTipo = "producto";
        } else if (tipo === "Fraccionamientos") {
            tempTipo = "fraccionamiento";
        } else if (tipo === "Ventas") {
            tempTipo = "venta";
        } else if (tipo === "Nota de credito") {
            tempTipo = "nota";
        } else if (tipo === "Apertura/Cierre de caja") {
            tempTipo = "caja";
        } else {
            tempTipo = "todos";
        }
        if (fecha === "Enero") {
            tempFecha = 1;
        } else if (fecha === "Febrero") {
            tempFecha = 2;
        } else if (fecha === "Marzo") {
            tempFecha = 3;
        } else if (fecha === "Abril") {
            tempFecha = 4;
        } else if (fecha === "Mayo") {
            tempFecha = 5;
        } else if (fecha === "Junio") {
            tempFecha = 6;
        } else if (fecha === "Julio") {
            tempFecha = 7;
        } else if (fecha === "Agosto") {
            tempFecha = 8;
        } else if (fecha === "Septiembre") {
            tempFecha = 9;
        } else if (fecha === "Octubre") {
            tempFecha = 10;
        } else if (fecha === "Noviembre") {
            tempFecha = 11;
        } else if (fecha === "Diciembre") {
            tempFecha = 12;
        } else {
            tempFecha = "todos";
        }

        setHistorial(
            await getHistorial({
                tipo: tempTipo,
                responsable: tempVendedor,
                fecha: tempFecha,
                year:
                    yearRef.current.value === "todos"
                        ? "todos"
                        : parseInt(yearRef.current.value),
            })
        );
    };
    const historialFormateado = () => {
        var enero = [];
        var febrero = [];
        var marzo = [];
        var abril = [];
        var mayo = [];
        var junio = [];
        var julio = [];
        var agosto = [];
        var septiembre = [];
        var octubre = [];
        var noviembre = [];
        var diciembre = [];
        var arrayOrdenado = [];
        historial.forEach((elemento) => {
            const mes = new Date(elemento.createdAt).getMonth() + 1;
            if (mes === 1) {
                enero.push(elemento);
            } else if (mes === 2) {
                febrero.push(elemento);
            } else if (mes === 3) {
                marzo.push(elemento);
            } else if (mes === 4) {
                abril.push(elemento);
            } else if (mes === 5) {
                mayo.push(elemento);
            } else if (mes === 6) {
                junio.push(elemento);
            } else if (mes === 7) {
                julio.push(elemento);
            } else if (mes === 8) {
                agosto.push(elemento);
            } else if (mes === 9) {
                septiembre.push(elemento);
            } else if (mes === 10) {
                octubre.push(elemento);
            } else if (mes === 11) {
                noviembre.push(elemento);
            } else {
                diciembre.push(elemento);
            }
        });
        arrayOrdenado.push(enero.reverse());
        arrayOrdenado.push(febrero.reverse());
        arrayOrdenado.push(marzo.reverse());
        arrayOrdenado.push(abril.reverse());
        arrayOrdenado.push(mayo.reverse());
        arrayOrdenado.push(junio.reverse());
        arrayOrdenado.push(julio.reverse());
        arrayOrdenado.push(agosto.reverse());
        arrayOrdenado.push(septiembre.reverse());
        arrayOrdenado.push(octubre.reverse());
        arrayOrdenado.push(noviembre.reverse());
        arrayOrdenado.push(diciembre.reverse());
        setFormattedHistory(arrayOrdenado);
    };
    return (
        <Main>
            <FiltrosDiv>
                <Container
                    column
                    style={{
                        width: "80%",
                    }}
                >
                    <FiltrosTitle>Filtrar</FiltrosTitle>
                    <Container
                        row
                        style={{
                            alignItems: "center",
                            justifyContent: "space-evenly",
                            width: "100%",
                            height: "100%",
                        }}
                    >
                        <Container column style={{ width: "15%" }}>
                            <Label>Por tipo</Label>
                            <Select ref={tipoRef} onChange={handleClick}>
                                <Option>Todos</Option>
                                <Option>Apertura/Cierre de caja</Option>
                                <Option>Ventas</Option>
                                <Option>Fraccionamientos</Option>
                                <Option>Nota de credito</Option>
                                <Option>Movimientos de productos</Option>
                            </Select>
                        </Container>
                        <Container column style={{ width: "15%" }}>
                            <Label>Por vendedor</Label>
                            <Select ref={vendedorRef} onChange={handleClick}>
                                <Option>Todos</Option>
                                {vendedores.map((vendedor) => (
                                    <Option key={vendedor._id}>
                                        {vendedor.nombre}
                                    </Option>
                                ))}
                            </Select>
                        </Container>
                        <Container column style={{ width: "15%" }}>
                            <Label>Por fecha</Label>
                            <Select ref={fechaRef} onChange={handleClick}>
                                <Option>Todos</Option>
                                <Option>Enero</Option>
                                <Option>Febrero</Option>
                                <Option>Marzo</Option>
                                <Option>Abril</Option>
                                <Option>Mayo</Option>
                                <Option>Junio</Option>
                                <Option>Julio</Option>
                                <Option>Agosto</Option>
                                <Option>Septiembre</Option>
                                <Option>Octubre</Option>
                                <Option>Noviembre</Option>
                                <Option>Diciembre</Option>
                            </Select>
                            <Select
                                defaultValue={"todos"}
                                ref={yearRef}
                                onChange={handleClick}
                            >
                                <Option value={"todos"}>Todos</Option>
                                <Option value={new Date().getFullYear() - 1}>
                                    {new Date().getFullYear() - 1}
                                </Option>
                                <Option value={new Date().getFullYear()}>
                                    {new Date().getFullYear()}
                                </Option>
                                <Option value={new Date().getFullYear() + 1}>
                                    {new Date().getFullYear() + 1}
                                </Option>
                            </Select>
                        </Container>
                    </Container>
                </Container>
                <SearchButton
                    onClick={async () => {
                        setHistorial(
                            await getHistorial({
                                tipo: "todos",
                                responsable: "todos",
                                fecha: "todos",
                                year: "todos",
                            })
                        );
                    }}
                >
                    Historial completo
                </SearchButton>
            </FiltrosDiv>
            {!formattedHistory[0] ? (
                <div>No se encuentran resultados</div>
            ) : (
                formattedHistory
                    .slice(0)
                    .reverse()
                    .map((elemento, index) => {
                        let mes;
                        if (index === 0) mes = "Diciembre";
                        if (index === 1) mes = "Noviembre";
                        if (index === 2) mes = "Octubre";
                        if (index === 3) mes = "Septiembre";
                        if (index === 4) mes = "Agosto";
                        if (index === 5) mes = "Julio";
                        if (index === 6) mes = "Junio";
                        if (index === 7) mes = "Mayo";
                        if (index === 8) mes = "Abril";
                        if (index === 9) mes = "Marzo";
                        if (index === 10) mes = "Febrero";
                        if (index === 11) mes = "Enero";
                        if (!elemento[0]) {
                            return "";
                        }
                        return (
                            <Table key={`tabla${index}`}>
                                <Thead>
                                    <Tr key={"asd122"}>
                                        <Th colSpan="7">{mes}</Th>
                                    </Tr>
                                    <Tr key={"asd1"}>
                                        <Th>Dia</Th>
                                        <Th>Hora</Th>
                                        <Th>Tipo</Th>
                                        <Th>Responsable</Th>
                                        <Th>Descripcion</Th>
                                        <Th>Feria/Local</Th>
                                        <Th>Total</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {elemento.map((registro) => {
                                        const {
                                            _id,
                                            tipo,
                                            descripcion,
                                            responsable,
                                            opcional,
                                            total,
                                            createdAt,
                                        } = registro;
                                        function returnBackgroundColor() {
                                            if (tipo === "venta") {
                                                return "background-color: lightgoldenrodyellow;";
                                            } else if (tipo === "producto") {
                                                return "background-color: lightcoral;";
                                            } else if (tipo === "caja") {
                                                return "background-color: yellowgreen;";
                                            } else if (tipo === "nota") {
                                                return "background-color: lightskyblue;";
                                            } else {
                                                return "background-color: whitesmoke;";
                                            }
                                        }

                                        if (tipo === "venta") {
                                            const descripcionJson =
                                                JSON.parse(descripcion);
                                            return (
                                                <Tr
                                                    hoverable
                                                    key={_id}
                                                    tipo={returnBackgroundColor}
                                                >
                                                    <Td hoverable>
                                                        {new Date(
                                                            createdAt
                                                        ).getDate()}
                                                    </Td>
                                                    <Td hoverable>
                                                        {`${new Date(
                                                            createdAt
                                                        ).getHours()}:${
                                                            (new Date(
                                                                createdAt
                                                            ).getMinutes() < 10
                                                                ? "0"
                                                                : "") +
                                                            new Date(
                                                                createdAt
                                                            ).getMinutes()
                                                        }`}
                                                    </Td>
                                                    <Td hoverable>{tipo}</Td>
                                                    <Td hoverable>
                                                        {responsable}
                                                    </Td>
                                                    <Td hoverable>
                                                        {descripcionJson.map(
                                                            (
                                                                product,
                                                                index
                                                            ) => {
                                                                const {
                                                                    producto,
                                                                    cantidad,
                                                                    marca,
                                                                    precioVenta,
                                                                    porcentajeGanancia,
                                                                } =
                                                                    product.producto;

                                                                return (
                                                                    <div
                                                                        key={
                                                                            product
                                                                                .producto
                                                                                ._id +
                                                                            index
                                                                        }
                                                                        style={{
                                                                            marginTop:
                                                                                "5px",
                                                                            marginBottom:
                                                                                "5px",
                                                                        }}
                                                                    >
                                                                        Producto:{" "}
                                                                        {
                                                                            producto
                                                                        }
                                                                        . Marca:{" "}
                                                                        {marca}.
                                                                        Cantidad
                                                                        vendida:{" "}
                                                                        {
                                                                            cantidad
                                                                        }
                                                                        . Precio
                                                                        de
                                                                        venta: $
                                                                        {
                                                                            precioVenta
                                                                        }
                                                                        .
                                                                        Porcentaje
                                                                        de
                                                                        ganancia:{" "}
                                                                        {
                                                                            porcentajeGanancia
                                                                        }
                                                                        %.
                                                                        {descripcionJson.length ===
                                                                        index +
                                                                            1 ? null : (
                                                                            <hr
                                                                                key={
                                                                                    product
                                                                                        .producto
                                                                                        ._id +
                                                                                    "index"
                                                                                }
                                                                            />
                                                                        )}
                                                                    </div>
                                                                );
                                                            }
                                                        )}
                                                    </Td>
                                                    <Td hoverable>
                                                        {opcional
                                                            ? opcional
                                                            : "-"}
                                                    </Td>
                                                    <Td hoverable>
                                                        {total ? total : "-"}
                                                    </Td>
                                                </Tr>
                                            );
                                        } else if (tipo === "nota") {
                                            const descripcionJson =
                                                JSON.parse(descripcion);
                                            return (
                                                <Tr
                                                    hoverable
                                                    key={_id}
                                                    tipo={returnBackgroundColor}
                                                >
                                                    <Td hoverable>
                                                        {new Date(
                                                            createdAt
                                                        ).getDate()}
                                                    </Td>
                                                    <Td hoverable>
                                                        {`${new Date(
                                                            createdAt
                                                        ).getHours()}:${
                                                            (new Date(
                                                                createdAt
                                                            ).getMinutes() < 10
                                                                ? "0"
                                                                : "") +
                                                            new Date(
                                                                createdAt
                                                            ).getMinutes()
                                                        }`}
                                                    </Td>
                                                    <Td hoverable>
                                                        Nota de crédito
                                                    </Td>
                                                    <Td hoverable>
                                                        {responsable}
                                                    </Td>
                                                    <Td hoverable>
                                                        <hr></hr>
                                                        {descripcionJson.map(
                                                            (item) => {
                                                                return (
                                                                    <>
                                                                        <div>{`Producto: ${item.producto}. Cantidad: ${item.cantidad}`}</div>
                                                                        <hr></hr>
                                                                    </>
                                                                );
                                                            }
                                                        )}
                                                    </Td>
                                                    <Td hoverable>
                                                        {opcional
                                                            ? opcional
                                                            : "-"}
                                                    </Td>
                                                    <Td hoverable>
                                                        {total ? total : "-"}
                                                    </Td>
                                                </Tr>
                                            );
                                        } else {
                                            return (
                                                <Tr
                                                    hoverable
                                                    key={_id}
                                                    tipo={returnBackgroundColor}
                                                >
                                                    <Td hoverable>
                                                        {new Date(
                                                            createdAt
                                                        ).getDate()}
                                                    </Td>
                                                    <Td hoverable>
                                                        {`${new Date(
                                                            createdAt
                                                        ).getHours()}:${
                                                            (new Date(
                                                                createdAt
                                                            ).getMinutes() < 10
                                                                ? "0"
                                                                : "") +
                                                            new Date(
                                                                createdAt
                                                            ).getMinutes()
                                                        }`}
                                                    </Td>
                                                    <Td hoverable>{tipo}</Td>
                                                    <Td hoverable>
                                                        {responsable}
                                                    </Td>
                                                    <Td hoverable>
                                                        {descripcion}
                                                    </Td>
                                                    <Td hoverable>
                                                        {opcional
                                                            ? opcional
                                                            : "-"}
                                                    </Td>
                                                    <Td hoverable>
                                                        {total ? total : "-"}
                                                    </Td>
                                                </Tr>
                                            );
                                        }
                                    })}
                                </Tbody>
                            </Table>
                        );
                    })
            )}
        </Main>
    );
}
const FiltrosDiv = styled.div`
    display: flex;
    width: 100%;
    height: 13vh;
    flex-direction: row;
    background-color: tomato;
`;
const FiltrosTitle = styled.h3`
    width: 100%;
    height: 3vh;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    padding: 0;
    font-size: 20px;
    color: white;
`;
const Label = styled.label`
    color: white;
    text-align: center;
    margin-bottom: 1vh;
    font-size: 20px;
    text-decoration: underline;
`;
const Container = styled.div`
    display: flex;
    ${(props) => props.row && "flex-direction: row;"}
    ${(props) => props.column && "flex-direction: column;"}
`;
const Select = styled.select`
    height: 3vh;
`;
const Option = styled.option``;
const Main = styled.div`
    width: 100%;
    min-height: 80vh;
`;
const SearchButton = styled.button`
    font-size: 25px;
    width: 20%;
    height: 100%;
    cursor: pointer;
    padding: 0;
    margin: 0;
    border: none;
    color: white;
    outline: none;
    background-color: orange;
    border-radius: 5vh 0 0 0;
    border-left: 1px solid white;
    border-top: 1px solid white;
    &:hover {
        background-color: orangered;
    }
`;
const Table = styled.table`
    padding: 16px;
    border-collapse: collapse;
    display: block;
    overflow-x: auto;
    width: 100%;
`;

const Thead = styled.thead``;
const Tbody = styled.tbody``;
const Th = styled.th`
    color: white;
    background-color: tomato;
    height: 3vh;
    border: 2px solid black;
    word-break: break-word;
    min-width: 100px;
    ${(props) => props.short && "width: 100px;"}
`;
const Td = styled.td`
    height: 3vh;
    border: 2px solid black;
    word-break: break-word;
    padding-left: 5px;
    text-align: center;
    background-color: inherit;
    ${(props) => props.short && "width: 100px; margin: 0; padding: 0;"}
    ${(props) => !props.hoverable && `background-color: aliceblue;`}
    &:hover {
        ${(props) =>
            props.hoverable
                ? `cursor: pointer;
        color: white;`
                : "cursor: default;"}
    }
`;
const Tr = styled.tr`
    ${(props) => props.hoverable && "background-color: white;cursor: pointer;"}
    ${(props) => props.tipo}
    &:hover {
        ${(props) => props.hoverable && "background-color: gray; color:white;"}
    }
`;
