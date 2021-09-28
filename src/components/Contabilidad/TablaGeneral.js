import { set } from "mongoose";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
    getHistorial,
    getVendedores,
    getFraccionamiento,
} from "../../services/apiCalls";

export default function TablaGeneral(props) {
    const [inversionistas, setInversionistas] = useState(0);
    const [localIpuum, setLocalIpuum] = useState(0);
    const [encuentrosForestacion, setEncuentrosForestacion] = useState(0);
    const [vendedores, setVendedores] = useState(0);
    const [contabilidad, setContabilidad] = useState(0);
    const [diseno, setDiseno] = useState(0);
    const [reinversion, setReinversion] = useState(0);

    const fetchDatos = async () => {
        let tempGananciaLocal = 0;
        let tempGananciaFeria = 0;
        let tempTotal = 0;
        const ventas = await getHistorial({
            tipo: "venta",
            responsable: "todos",
            fecha: props.month,
            year: props.year,
        });
        await ventas.forEach(async (venta) => {
            tempTotal += venta.total;
            if (venta.opcional === "local") {
                JSON.parse(await venta.descripcion).forEach(({ producto }) => {
                    tempGananciaLocal +=
                        (producto.precioVenta - producto.precioCompra) *
                        producto.cantidad;
                    console.log(producto.precioCompra, producto.precioVenta);
                });
            } else {
                JSON.parse(await venta.descripcion).forEach(({ producto }) => {
                    tempGananciaFeria +=
                        (producto.precioVenta - producto.precioCompra) *
                        producto.cantidad;
                });
            }
        });
        console.log(tempTotal);
        calculateGanancia(tempGananciaFeria, tempGananciaLocal);
    };
    useEffect(() => {
        fetchDatos();
    }, [props.month, props.year]);

    const calculateGanancia = (gananciaFeria, gananciaLocal) => {
        console.log(gananciaLocal, gananciaFeria);
        setInversionistas(gananciaFeria * 0.15 + gananciaLocal * 0.15);
        setLocalIpuum(gananciaFeria * 0.15 + gananciaLocal * 0.15);
        setEncuentrosForestacion(gananciaFeria * 0.03 + gananciaLocal * 0.05);
        setVendedores(gananciaFeria * 0.4 + gananciaLocal * 0.35);
        setContabilidad(gananciaFeria * 0.15 + gananciaLocal * 0.15);
        setDiseno(gananciaFeria * 0.04 + gananciaLocal * 0.05);
        setReinversion(gananciaFeria * 0.08 + gananciaLocal * 0.1);
    };
    return (
        <Container>
            {inversionistas !== 0 ? (
                <Table>
                    <Thead>
                        <Tr>
                            <Th colSpan="2">
                                Tabla de reparticion de ganancias
                            </Th>
                        </Tr>
                        <Tr>
                            <Th>Categoria</Th>
                            <Th>Monto</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td>Inversionistas</Td>
                            <Td>{inversionistas}</Td>
                        </Tr>
                        <Tr>
                            <Td>Local IPUUM</Td>
                            <Td>{localIpuum}</Td>
                        </Tr>
                        <Tr>
                            <Td>Encuentros y forestación</Td>
                            <Td> {encuentrosForestacion} </Td>
                        </Tr>
                        <Tr>
                            <Td>Vendedores</Td>
                            <Td> {vendedores} </Td>
                        </Tr>
                        <Tr>
                            <Td>Contabilidad</Td>
                            <Td> {contabilidad} </Td>
                        </Tr>
                        <Tr>
                            <Td>Diseño y difusión</Td>
                            <Td> {diseno} </Td>
                        </Tr>
                        <Tr>
                            <Td>Reinversión</Td>
                            <Td> {reinversion} </Td>
                        </Tr>
                    </Tbody>
                </Table>
            ) : (
                <div>No hay resultados :( . . .</div>
            )}
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
    padding: 5vh 10vh 5vh 10vh;
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
    min-width: 150px;
    ${(props) => props.delete && "min-width: 150px;"}
`;
const Td = styled.td`
    height: 3vh;
    border: 1px solid #ddd;
    word-break: break-word;
    padding-left: 5px;
    min-width: 150px;
    max-width: 250px;
    text-align: center;
    ${(props) => props.delete && "width: 150px; padding:0; margin:0;"}
`;
const Tr = styled.tr``;
