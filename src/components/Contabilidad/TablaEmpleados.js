import * as React from "react";
import styled from "styled-components";
import {
    getHistorial,
    getVendedores,
    getFraccionamiento,
} from "../../services/apiCalls";

export default function TablaEmpleados(props) {
    const [ventasVendedores, setVentasVendedores] = React.useState([]);

    const fetchDatos = async () => {
        const vendedores = await getVendedores();
        let tempList = await vendedores.map(async (vendedor) => {
            const ventas = await getHistorial({
                tipo: "venta",
                responsable: vendedor.nombre,
                fecha: props.month,
                year: props.year,
            });
            const fraccionamientos = await getFraccionamiento(
                props.month,
                props.year,
                vendedor.nombre
            );
            const info = await calcularInfoVentas(
                ventas,
                fraccionamientos,
                vendedor.nombre
            );
            return info;
        });
        setVentasVendedores(await Promise.all(tempList));
    };
    React.useEffect(() => {
        fetchDatos();
    }, [props.month, props.year]);
    const calcularInfoVentas = async (
        ventas,
        fraccionamientos,
        responsable
    ) => {
        let ventasEnFeria = 0;
        let ventasEnLocal = 0;
        let gananciaPorVentas = 0;
        let gananciaPorFraccionamientos = 0;
        let total = 0;
        ventas.forEach((venta) => {
            if (venta.opcional === "local") {
                ventasEnLocal += 1;
                gananciaPorVentas += venta.total * 0.35;
            } else {
                ventasEnFeria += 1;
                gananciaPorVentas += venta.total * 0.45;
            }
        });
        fraccionamientos.forEach((fraccionamiento) => {
            gananciaPorFraccionamientos += fraccionamiento.ganancia;
        });
        total = gananciaPorFraccionamientos + gananciaPorVentas;
        return {
            ventasEnFeria,
            ventasEnLocal,
            gananciaPorVentas: gananciaPorVentas.toFixed(2),
            gananciaPorFraccionamientos: gananciaPorFraccionamientos.toFixed(2),
            total: total.toFixed(2),
            responsable,
        };
    };
    return (
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
