import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
    getHistorial,
    getVendedores,
    getFraccionamiento,
} from "../../services/apiCalls";

export default function TablaGeneral(props) {
    const [ventasVendedores, setVentasVendedores] = useState([]);

    const fetchDatos = async () => {
        const ventas = await getHistorial({
            tipo: "venta",
            responsable: "todos",
            fecha: props.month,
            year: props.year,
        });
        console.log(ventas);
    };
    useEffect(() => {
        fetchDatos();
    }, [props.month, props.year]);

    return (
        <div>Épica tabla general</div>
        /*
        <Container>
            {ventasVendedores[0] ? (
                <Table>
                    <Thead>
                        <Tr>
                            <Th colSpan="6">Tabla empleados</Th>
                        </Tr>
                        <Tr>
                            <Th>Nombre</Th>
                            <Th>Ventas en feria</Th>
                            <Th>Ventas en local</Th>
                            <Th>Ganancia por ventas</Th>
                            <Th>Ganancia por fraccionamientos</Th>
                            <Th>Total</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {ventasVendedores.map((vendedor, index) => {
                            const {
                                responsable,
                                gananciaPorFraccionamientos,
                                gananciaPorVentas,
                                total,
                                ventasEnFeria,
                                ventasEnLocal,
                            } = vendedor;
                            return (
                                <Tr key={index}>
                                    <Td>{responsable}</Td>
                                    <Td>{ventasEnFeria}</Td>
                                    <Td>{ventasEnLocal}</Td>
                                    <Td>{gananciaPorVentas}</Td>
                                    <Td>{gananciaPorFraccionamientos}</Td>
                                    <Td>{total}</Td>
                                </Tr>
                            );
                        })}
                    </Tbody>
                </Table>
            ) : (
                <div>Loading. . .</div>
            )}
        </Container>*/
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
