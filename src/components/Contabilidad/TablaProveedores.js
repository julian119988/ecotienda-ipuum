import * as React from "react";
import styled from "styled-components";
import { getHistorial } from "../../services/apiCalls";

export default function TablaProveedores(props) {
    const [test, setTest] = React.useState([]);
    const [productosConcesion, setProductosConcesion] = React.useState([]);

    const fetchDatos = async () => {
        let tempList = [];
        const ventas = await getHistorial({
            tipo: "venta",
            responsable: "todos",
            fecha: props.month,
            year: props.year,
        });
        ventas.forEach(async (venta) => {
            const descripcion = JSON.parse(venta.descripcion);
            tempList.push(descripcion);
        });
        ventasConcesion(await Promise.all(tempList));
    };
    React.useEffect(() => {
        fetchDatos();
    }, [props.month, props.year]);

    const ventasConcesion = async (ventas) => {
        let listaProductosConcesionVendidos = [];
        let proveedores = [];
        let listaFinal = [];
        ventas.forEach(async (venta) => {
            await venta.forEach(async (producto) => {
                if (producto.producto.concesion) {
                    let existeProveedor = false;
                    proveedores.forEach((proveedor) => {
                        if (proveedor === producto.producto.marca) {
                            existeProveedor = true;
                        }
                    });
                    if (!existeProveedor)
                        proveedores.push(producto.producto.marca);

                    listaProductosConcesionVendidos.push({
                        proveedor: producto.producto.marca,
                        cantidad: producto.producto.cantidad,
                        total:
                            producto.producto.cantidad *
                            producto.producto.precioCompra,
                    });
                }
            });
        });
        proveedores.forEach((proveedor) => {
            let proveedorTemp = proveedor;
            let cantidad = 0;
            let total = 0;
            listaProductosConcesionVendidos.forEach((producto) => {
                if (proveedor === producto.proveedor) {
                    cantidad += producto.cantidad;
                    total += producto.total;
                }
            });
            listaFinal.push({
                proveedor: proveedorTemp,
                cantidad: cantidad,
                total: total,
            });
        });
        setProductosConcesion(await Promise.all(listaFinal));
    };

    return (
        <Container>
            {productosConcesion[0] ? (
                <Table>
                    <Thead>
                        <Tr>
                            <Th colSpan="3">Tabla proveedores</Th>
                        </Tr>
                        <Tr>
                            <Th>Proveedor</Th>
                            <Th>Cantidad</Th>
                            <Th>Total</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {productosConcesion.map((producto, index) => {
                            const { cantidad, proveedor, total } = producto;
                            return (
                                <Tr key={index}>
                                    <Td>{proveedor}</Td>
                                    <Td>{cantidad}</Td>
                                    <Td>{total}</Td>
                                </Tr>
                            );
                        })}
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
