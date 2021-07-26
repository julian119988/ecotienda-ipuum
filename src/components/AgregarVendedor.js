import React, { useRef, useState } from "react";
import styled from "styled-components";
import { uploadVendedor } from "../services/apiCalls";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useHistory } from "react-router-dom";
import smalltalk from "smalltalk";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

export default function AgregarVendedor() {
    const [vendedor, setVendedor] = useState({
        nombre: "",
        antiguedad: "",
        password: "",
        rol: "",
    });
    const [mostrarPass, setMostrarPass] = useState(false);
    const nombreRef = useRef();
    const antiguedadRef = useRef();
    const passwordRef = useRef();
    const password2Ref = useRef();
    const rolRef = useRef();

    let history = useHistory();

    const handleChange = () => {
        setVendedor({
            nombre: nombreRef.current.value,
            antiguedad: antiguedadRef.current.value,
            password: passwordRef.current.value,
            rol: rolRef.current.value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (passwordRef.current.value !== password2Ref.current.value) {
            await smalltalk.alert("Error", "Las contraseñas no son iguales.");
        } else {
            try {
                await uploadVendedor(vendedor);

                history.goBack();
            } catch (err) {
                await smalltalk.alert(
                    "Error",
                    "Ha ocurrido un error al agregar el vendedor."
                );
            }
        }
    };

    return (
        <Container>
            <GoBackBar onClick={() => history.goBack()}>
                <ArrowBackIcon
                    style={{
                        height: "100%",
                        width: "10vh",
                        marginRight: "auto",
                        fill: "white",
                        textAlign: "center",
                    }}
                />
            </GoBackBar>
            <Form onSubmit={handleSubmit}>
                <Input
                    type="text"
                    placeholder="Nombre"
                    onChange={handleChange}
                    ref={nombreRef}
                    required
                />
                <LittleContainer>
                    <Input
                        type={mostrarPass ? "text" : "password"}
                        placeholder="Contraseña"
                        onChange={handleChange}
                        ref={passwordRef}
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
                <LittleContainer>
                    <Input
                        type={mostrarPass ? "text" : "password"}
                        placeholder="Repita la contraseña"
                        onChange={handleChange}
                        ref={password2Ref}
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
                <Select ref={rolRef} onChange={handleChange} required>
                    <option key="vendedor">vendedor</option>
                    <option key="admin">admin</option>
                </Select>
                <Input
                    type="date"
                    placeholder="Antiguedad"
                    onChange={handleChange}
                    ref={antiguedadRef}
                    required
                />
                <Input
                    type="submit"
                    value="Agregar vendedor"
                    style={{
                        color: "white",
                        backgroundColor: "tomato",
                        cursor: "pointer",
                    }}
                />
            </Form>
        </Container>
    );
}
const LittleContainer = styled.div`
    margin: 0;
    padding: 0;
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 500px;
    margin: 2.5vh;
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
const Select = styled.select`
    width: 80%;
    max-width: 500px;
    margin: 2.5vh;
    height: 5vh;
    border-radius: 5vh;
    border: 2px solid tomato;
    padding: 1vh;
    outline: none;
    background-color: white;
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
    margin: 2.5vh;
    height: 5vh;
    border-radius: 5vh;
    border: 2px solid tomato;
    padding: 1vh;
    outline: none;
`;

const GoBackBar = styled.div`
    width: 100%;
    height: 10vh;
    background-color: tomato;
    color: white;
    cursor: pointer;
    &:hover {
        background-color: wheat;
    }
    &:focus {
        background-color: wheat;
    }
`;
