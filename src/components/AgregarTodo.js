import React, { useRef, useState } from "react";
import styled from "styled-components";
import { uploadTodo } from "../services/apiCalls";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useHistory } from "react-router-dom";
import smalltalk from "smalltalk";

export default function AgregarTodo() {
    const [todo, setTodo] = useState({
        titulo: "",
        descripcion: "",
        persona: "",
    });
    const titleRef = useRef();
    const descRef = useRef();
    const personaRef = useRef();
    let history = useHistory();

    const handleChange = () => {
        setTodo({
            titulo: titleRef.current.value,
            descripcion: descRef.current.value,
            persona: personaRef.current.value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        e.target.reset();
        try {
            await uploadTodo(todo);
            history.goBack();
        } catch (err) {
            await smalltalk.alert(
                "Error",
                "Ha ocurrido un error al agregar la tarea."
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
                    placeholder="Persona"
                    onChange={handleChange}
                    ref={personaRef}
                    required
                />
                <Input
                    type="text"
                    placeholder="Titulo"
                    onChange={handleChange}
                    ref={titleRef}
                    required
                />
                <InputDescripcion
                    type="textarea"
                    placeholder="Descripcion"
                    onChange={handleChange}
                    ref={descRef}
                    required
                    style={{ paddingTop: "3vh" }}
                />
                <Input
                    type="submit"
                    value="Subir tarea"
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
const InputDescripcion = styled.textarea`
    width: 80%;
    max-width: 500px;
    margin: 5vh;
    height: 10vh;
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
