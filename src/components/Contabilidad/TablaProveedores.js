import * as React from "react";
import styled from "styled-components";
import { getHistorial } from "../../services/apiCalls";

export default function TablaProveedores(props) {
    const [productosConcesion, setProductosConcesion] = React.useState([]);
    const [total, setTotal] = React.useState(0);

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
        const movimientoProductos = await getHistorial({
            tipo: "producto",
            responsable: "todos",
            fecha: props.month,
            year: props.year,
        });

        console.log(movimientoProductos);
        ventasConcesion(await Promise.all(tempList));
    };
    React.useEffect(() => {
        fetchDatos();
    }, [props.month, props.year]);

    const ventasConcesion = async (ventas) => {
        let listaProductosConcesionVendidos = [];
        let proveedores = [];
        let listaFinal = [];
        let totalSum = 0;
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
                    console.log(producto.producto);
                    listaProductosConcesionVendidos.push({
                        proveedor: producto.producto.marca,
                        cantidad: producto.producto.cantidad,
                        producto: {
                            producto: producto.producto.producto,
                            cantidad: producto.producto.cantidad,
                        },
                        total:
                            producto.producto.cantidad *
                            producto.producto.precioCompra,
                    });
                }
            });
        });
        console.log(listaProductosConcesionVendidos);
        proveedores.forEach((proveedor) => {
            let proveedorTemp = proveedor;
            let cantidad = 0;
            let total = 0;
            let productos = [];
            listaProductosConcesionVendidos.forEach((producto) => {
                if (proveedor === producto.proveedor) {
                    cantidad += producto.cantidad;
                    total += producto.total;
                    productos = [...productos, producto.producto];
                }
            });
            totalSum += total;
            listaFinal.push({
                proveedor: proveedorTemp,
                cantidad: cantidad,
                productos: productos,
                total: total,
            });
        });
        setTotal(totalSum);
        setProductosConcesion(await Promise.all(listaFinal));
    };

    return (
        <Container>
            {productosConcesion[0] ? (
                <Table>
                    <Thead>
                        <Tr>
                            <Th colSpan="4">Tabla proveedores concesion</Th>
                        </Tr>
                        <Tr>
                            <Th>Proveedor</Th>
                            <Th>Cantidad</Th>
                            <Th>Ventas</Th>
                            <Th>Total</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {productosConcesion.map((producto, index) => {
                            const { cantidad, proveedor, total, productos } =
                                producto;
                            return (
                                <Tr key={index}>
                                    <Td>{proveedor}</Td>
                                    <Td>{cantidad}</Td>
                                    <Td>
                                        {productos.map((producto, index) => {
                                            return (
                                                <>
                                                    {`${producto.producto}: ${producto.cantidad}`}
                                                    {index !==
                                                        productos.length -
                                                            1 && <hr />}
                                                </>
                                            );
                                        })}
                                    </Td>
                                    <Td>{total}</Td>
                                </Tr>
                            );
                        })}
                    </Tbody>
                    <tfoot>
                        <tr>
                            <Td colSpan="3">TOTAL</Td>
                            <Td>{total}</Td>
                        </tr>
                    </tfoot>
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
    padding: 15px;
    min-width: 150px;
    max-width: 250px;
    text-align: center;
    ${(props) => props.delete && "width: 150px; padding:0; margin:0;"}
`;
const Tr = styled.tr``;
