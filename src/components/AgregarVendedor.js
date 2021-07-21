import React, { useRef, useState } from "react";
import styled from "styled-components";
import { uploadVendedor } from "../services/apiCalls";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useHistory } from "react-router-dom";
import smalltalk from "smalltalk";

export default function AgregarVendedor() {
    const [vendedor, setVendedor] = useState({
        nombre: "",
        antiguedad: "",
    });
    const nombreRef = useRef();
    const antiguedadRef = useRef();

    let history = useHistory();

    const handleChange = () => {
        setVendedor({
            nombre: nombreRef.current.value,
            antiguedad: antiguedadRef.current.value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        e.target.reset();
        try {
            await uploadVendedor(vendedor);
            history.goBack();
        } catch (err) {
            await smalltalk.alert(
                "Error",
                "Ha ocurrido un error al agregar el vendedor."
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
                    placeholder="Nombre"
                    onChange={handleChange}
                    ref={nombreRef}
                    required
                />
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
