import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DeleteIcon from "@material-ui/icons/Delete";
import { useHistory } from "react-router";
import {
    deleteFraccionamiento,
    getFraccionamiento,
} from "../services/apiCalls";
import smalltalk from "smalltalk";
import Loader from "react-loader-spinner";

export default function AdministarVendedores(props) {
    const [fraccionamientos, setFraccionamientos] = useState([]);
    const history = useHistory();

    useEffect(() => {
        fetchFraccionamientos();
    }, []);

    const fetchFraccionamientos = async () => {
        const response = await getFraccionamiento();
        setFraccionamientos(response.reverse());
    };

    const handleClick = async (id, idHistorial) => {
        try {
            await deleteFraccionamiento(id, idHistorial);
            await fetchFraccionamientos();
        } catch (err) {
            await smalltalk.alert(
                "Error",
                "Ha ocurrido un error al agregar el vendedor."
            );
        }
    };

    return (
        <Container>
            <UploadVendedorButton
                onClick={() => history.push("/agregar-fraccionamiento")}
            >
                Agregar fraccionamiento
            </UploadVendedorButton>
            {fraccionamientos[0] === undefined ? (
                <Center>
                    <Loader
                        type="ThreeDots"
                        color="tomato"
                        height={100}
                        width={100}
                    />
                </Center>
            ) : (
                <Table>
                    <Thead>
                        <Tr>
                            <Th colSpan="6">Fraccionamientos</Th>
                        </Tr>
                        <Tr>
                            <Th>Nombre</Th>
                            <Th>Descripcion</Th>
                            <Th>Cantidad</Th>
                            <Th>Total</Th>
                            <Th>Fecha</Th>
                            <Th delete>Eliminar Fraccionamiento</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {fraccionamientos.map((fraccionamiento) => {
                            const dia = fraccionamiento.fecha.slice(8, 10);
                            const mes = fraccionamiento.fecha.slice(5, 7);
                            const year = fraccionamiento.fecha.slice(0, 4);

                            return (
                                <Tr key={fraccionamiento._id}>
                                    <Td>{fraccionamiento.nombre}</Td>
                                    <Td>{fraccionamiento.descripcion}</Td>
                                    <Td>{fraccionamiento.cantidad}</Td>
                                    <Td>{fraccionamiento.ganancia}</Td>
                                    <Td>{`${dia}/${mes}/${year}`}</Td>
                                    <Td delete>
                                        <DeleteButton
                                            disabled={
                                                fraccionamiento.nombre !==
                                                props.user.nombre
                                            }
                                            isDisabled={
                                                fraccionamiento.nombre !==
                                                props.user.nombre
                                            }
                                            onClick={() =>
                                                handleClick(
                                                    fraccionamiento._id,
                                                    fraccionamiento.idHistorial
                                                )
                                            }
                                        >
                                            <DeleteIcon
                                                style={{ fill: "white" }}
                                            />
                                        </DeleteButton>
                                    </Td>
                                </Tr>
                            );
                        })}
                    </Tbody>
                </Table>
            )}
        </Container>
    );
}
const UploadVendedorButton = styled.button`
    background-color: tomato;
    border: none;
    border-radius: 2vh;
    cursor: pointer;
    padding: 2vh 4vh 2vh 4vh;
    color: white;
    outline: none;
    min-width: max-content;
    &:hover {
        background-color: orange;
    }
    &:focus {
        background-color: orange;
    }
`;
const Center = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
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

const Container = styled.div`
    width: 100%;
    padding: 5vh 10vh 5vh 10vh;
`;
const DeleteButton = styled.button`
    width: 100%;
    height: 100%;
    cursor: pointer;
    margin: 0;
    padding: 0;
    border: none;
    outline: none;
    ${(props) =>
        props.isDisabled
            ? "background-color: gray; cursor: default;"
            : `
        background-color: tomato;
        &:hover {
            background-color: orange;
        }
        &:focus {
            background-color: orange;
        }
    `}
`;
