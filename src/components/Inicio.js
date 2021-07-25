import React, { useEffect, useState } from "react";
import styled from "styled-components";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import { checkPass, getVendedores } from "../services/apiCalls";
import { useHistory } from "react-router";
import smalltalk from "smalltalk";

export default function Inicio(props) {
    const [estado, setEstado] = useState(undefined);
    const [vendedores, setVendedores] = useState(undefined);
    const [mostrarPass, setMostrarPass] = useState(false);
    const history = useHistory();

    useEffect(() => {
        fetchVendedores();
    }, []);

    const fetchVendedores = async () => {
        const response = await getVendedores();
        setVendedores(response);
        if (!response[0]) history.push("/agregar-vendedor");
        let isAdmin = false;
        response.forEach((vendedor) => {
            if (vendedor.rol === "admin") {
                isAdmin = true;
            }
        });
        if (!isAdmin) history.push("/agregar-vendedor");
    };

    const handleChange = (e) => {};
    const handleSubmit = async (e) => {
        const nombre = e.target[0].value;
        const pass = e.target[1].value;
        e.preventDefault();
        if (estado === "admin") {
            const response = await checkPass(nombre, pass);
            if (response.isAuthenticated) {
                props.defineUser(response.user);
            } else {
                smalltalk.alert("Error", "Usuario o contraseña erroneas.");
            }
        } else {
            const response = await checkPass(nombre, pass);
            if (response.isAuthenticated) {
                props.defineUser(response.user);
            } else {
                smalltalk.alert("Error", "Usuario o contraseña erroneas.");
            }
        }
    };

    return (
        <>
            <Titulo>Ecotienda IPUUM</Titulo>
            <Container>
                {estado === undefined ? (
                    <>
                        <Button
                            onClick={() => setEstado("vendedor")}
                            style={{ marginTop: "10vh" }}
                        >
                            Iniciar como vendedor
                        </Button>
                        <Button onClick={() => setEstado("admin")}>
                            Iniciar como administrador
                        </Button>
                    </>
                ) : estado === "admin" ? (
                    <>
                        <Form onSubmit={handleSubmit}>
                            <Select
                                type="text"
                                placeholder="Nombre"
                                onChange={handleChange}
                                required
                            >
                                {vendedores.map(
                                    (vendedor) =>
                                        vendedor.rol === "admin" && (
                                            <option key={vendedor._id}>
                                                {vendedor.nombre}
                                            </option>
                                        )
                                )}
                            </Select>
                            <LittleContainer>
                                <Input
                                    type={mostrarPass ? "text" : "password"}
                                    placeholder="Contraseña"
                                    onChange={handleChange}
                                    required
                                    style={{ width: "100%", margin: "0" }}
                                />
                                {mostrarPass ? (
                                    <Icon onClick={() => setMostrarPass(false)}>
                                        <VisibilityOffIcon />
                                    </Icon>
                                ) : (
                                    <Icon onClick={() => setMostrarPass(true)}>
                                        <VisibilityIcon />
                                    </Icon>
                                )}
                            </LittleContainer>
                            <Input
                                type="submit"
                                value="Iniciar sesion"
                                style={{
                                    color: "white",
                                    backgroundColor: "tomato",
                                    cursor: "pointer",
                                }}
                            />
                        </Form>
                        <Button onClick={() => setEstado(undefined)}>
                            Volver
                        </Button>
                    </>
                ) : (
                    <>
                        <Form onSubmit={handleSubmit}>
                            <Select
                                type="text"
                                placeholder="Nombre"
                                onChange={handleChange}
                                required
                            >
                                {vendedores.map(
                                    (vendedor) =>
                                        vendedor.rol === "vendedor" && (
                                            <option key={vendedor._id}>
                                                {vendedor.nombre}
                                            </option>
                                        )
                                )}
                            </Select>
                            <LittleContainer>
                                <Input
                                    type={mostrarPass ? "text" : "password"}
                                    placeholder="Contraseña"
                                    onChange={handleChange}
                                    required
                                    style={{ width: "100%", margin: "0" }}
                                />
                                {mostrarPass ? (
                                    <Icon onClick={() => setMostrarPass(false)}>
                                        <VisibilityOffIcon />
                                    </Icon>
                                ) : (
                                    <Icon onClick={() => setMostrarPass(true)}>
                                        <VisibilityIcon />
                                    </Icon>
                                )}
                            </LittleContainer>
                            <Input
                                type="submit"
                                value="Iniciar sesion"
                                style={{
                                    color: "white",
                                    backgroundColor: "tomato",
                                    cursor: "pointer",
                                }}
                            />
                        </Form>
                        <Button onClick={() => setEstado(undefined)}>
                            Volver
                        </Button>
                    </>
                )}
            </Container>
        </>
    );
}
const Select = styled.select`
    width: 80%;
    max-width: 500px;
    margin: 5vh;
    height: 5vh;
    border-radius: 5vh;
    border: 2px solid tomato;
    padding: 1vh;
    outline: none;
    background-color: white;
`;
const LittleContainer = styled.div`
    margin: 0;
    padding: 0;
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 500px;
`;
const Icon = styled.div`
    margin: 0;
    padding: 0;
    position: absolute;
    right: 3vh;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const Button = styled.button`
    width: 80%;
    max-width: 500px;
    margin: 5vh;
    height: 5vh;
    border-radius: 5vh;
    border: 2px solid tomato;
    padding: 1vh;
    outline: none;
    color: white;
    background-color: tomato;
    cursor: pointer;
    font-size: 20px;
`;
const Titulo = styled.div`
    width: 100%;
    height: 10vh;
    background-color: tomato;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
`;
const Container = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const Form = styled.form`
    display: flex;
    flex-direction: column;
    margin: 10vh;
    width: 100%;
    align-items: center;
`;

const Input = styled.input`
    width: 80%;
    max-width: 500px;
    margin: 5vh;
    height: 5vh;
    border-radius: 5vh;
    border: 2px solid tomato;
    padding: 1vh;
    outline: none;
`;
