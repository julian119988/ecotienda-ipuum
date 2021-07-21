import * as React from "react";
import styled from "styled-components";
import DeleteIcon from "@material-ui/icons/Delete";
import { useHistory } from "react-router";
import { getVendedores, deleteVendedor } from "../services/apiCalls";
import smalltalk from "smalltalk";
import Loader from "react-loader-spinner";

export default function AdministarVendedores() {
    const [vendedores, setVendedores] = React.useState(undefined);
    const history = useHistory();

    React.useEffect(() => {
        fetchVendedores();
    }, []);

    const fetchVendedores = async () => {
        try {
            const vendedores = await getVendedores();
            setVendedores(vendedores);
        } catch (error) {
            smalltalk.alert("Error!", "Ha surgido un error.");
        }
    };
    const handleClick = async (id) => {
        try {
            await deleteVendedor(id);
            await fetchVendedores();
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
                onClick={() => history.push("/agregar-vendedor")}
            >
                Agregar vendedor
            </UploadVendedorButton>
            {vendedores === undefined ? (
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
                            <Th>Nombre</Th>
                            <Th>Antigüedad</Th>
                            <Th delete>Eliminar Vendedor</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {vendedores.map((vendedor) => {
                            const dia = vendedor.antiguedad.slice(8, 10);
                            const mes = vendedor.antiguedad.slice(5, 7);
                            const year = vendedor.antiguedad.slice(0, 4);
                            return (
                                <Tr key={vendedor._id}>
                                    <Td>{vendedor.nombre}</Td>
                                    <Td>{`${dia}/${mes}/${year}`}</Td>
                                    <Td
                                        delete
                                        onClick={() =>
                                            handleClick(vendedor._id)
                                        }
                                    >
                                        <DeleteButton>
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
`;

const Thead = styled.thead``;
const Tbody = styled.tbody``;
const Th = styled.th`
    color: white;
    background-color: tomato;
    height: 3vh;
    border: 1px solid #ddd;
    word-break: break-word;
    ${(props) =>
        props.delete ? "width: 150px;" : "min-width: 250px;max-width: 500px;"}
`;
const Td = styled.td`
    height: 3vh;
    border: 1px solid #ddd;
    word-break: break-word;
    padding-left: 5px;
    ${(props) =>
        props.delete
            ? "width: 150px; padding:0; margin:0;"
            : "min-width: 250px;max-width: 500px;"}
`;
const Tr = styled.tr``;

const Container = styled.div`
    width: 100%;
    padding: 5vh 10vh 5vh 10vh;
`;
const DeleteButton = styled.button`
    width: 100%;
    height: 100%;
    background-color: tomato;
    cursor: pointer;
    margin: 0;
    padding: 0;
    border: none;
    outline: none;
    &:hover {
        background-color: orange;
    }
    &:focus {
        background-color: orange;
    }
`;
