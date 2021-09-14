import * as React from "react";
import styled from "styled-components";
import {
  getHistorial,
  getVendedores,
  getFraccionamiento,
} from "../services/apiCalls";
export default function Contabilidad() {
  const [ventasVendedores, setVentasVendedores] = React.useState([]);

  React.useEffect(() => {
    fetchDatos();
  }, []);
  const fetchDatos = async () => {
    const tempList = [];
    const vendedores = await getVendedores();
    vendedores.forEach(async (vendedor) => {
      const ventas = await getHistorial({
        tipo: "venta",
        responsable: vendedor.nombre,
        fecha: 9,
      });

      const fraccionamientos = await getFraccionamiento(9, vendedor.nombre);
      const info = await calcularInfoVentas(
        ventas,
        fraccionamientos,
        vendedor.nombre
      );
      tempList.push(info);
    });
    setVentasVendedores(tempList);
  };
  React.useEffect(() => {
    console.log(ventasVendedores);
  }, [ventasVendedores]);

  const calcularInfoVentas = async (ventas, fraccionamientos, responsable) => {
    //Falta mostrar bien la tabla y realizar el filtrado de los fraccionamientos en server/controllers
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
      gananciaPorVentas,
      gananciaPorFraccionamientos,
      total,
      responsable,
    };
  };
  return (
    <Container>
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
          {ventasVendedores.map((vendedor) => {
            const {
              responsable,
              gananciaPorFraccionamientos,
              gananciaPorVentas,
              total,
              ventasEnFeria,
              ventasEnLocal,
            } = vendedor;
            return (
              <Tr>
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
