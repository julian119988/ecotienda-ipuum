import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { postFraccionamiento, getVendedores } from "../services/apiCalls";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useHistory } from "react-router-dom";
import smalltalk from "smalltalk";

export default function AgregarFraccionamiento(props) {
    const [fraccionamiento, setFraccionamiento] = useState({
        nombre: "",
        descripcion: "",
        cantidad: 0,
        gananci: 0,
        fechaRef: Date.now(),
    });
    const descripcionRef = useRef();
    const gananciaRef = useRef();
    const cantidadRef = useRef();
    let history = useHistory();

    const handleChange = () => {
        setFraccionamiento({
            nombre: props.user.nombre,
            descripcion: descripcionRef.current.value,
            ganancia: gananciaRef.current.value,
            cantidad: cantidadRef.current.value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await postFraccionamiento(fraccionamiento);
            history.goBack();
        } catch (err) {
            await smalltalk.alert(
                "Error",
                "Ha ocurrido un error al agregar el fraccionamiento."
            );
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
                    placeholder="Descripcion"
                    onChange={handleChange}
                    ref={descripcionRef}
                    required
                />
                <Input
                    type="number"
                    placeholder="Precio unitario"
                    onChange={handleChange}
                    ref={gananciaRef}
                    required
                />
                <Input
                    type="number"
                    placeholder="Cantidad"
                    onChange={handleChange}
                    ref={cantidadRef}
                    required
                />
                <Input
                    type="submit"
                    value="Agregar fraccionamiento"
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
