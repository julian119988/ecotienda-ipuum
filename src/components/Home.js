import * as React from "react";
import styled from "styled-components";
import Loader from "react-loader-spinner";
import { getTodo, deleteTodo } from "../services/apiCalls";
import { useHistory } from "react-router-dom";

export default function Home() {
    const [todos, setTodos] = React.useState(undefined);

    const handleClick = async (id) => {
        await deleteTodo(id);
        await fetchTodos();
    };
    React.useEffect(() => {
        fetchTodos();
    }, []);
    let history = useHistory();

    const fetchTodos = async () => {
        try {
            const response = await getTodo();
            setTodos(response.reverse());
            return response;
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Container>
            <UploadTodoButton onClick={() => history.push("/agregar-todo")}>
                Agregar tarea
            </UploadTodoButton>
            {todos === undefined ? (
                <Center>
                    <Loader
                        type="ThreeDots"
                        color="tomato"
                        height={100}
                        width={100}
                    />
                </Center>
            ) : (
                <TodoList>
                    {todos.map((todo) => {
                        const dia = todo.fecha.slice(8, 10);
                        const mes = todo.fecha.slice(5, 7);
                        const year = todo.fecha.slice(0, 4);
                        const hora = todo.fecha.slice(11, -8);
                        return (
                            <TodoItem key={todo._id}>
                                <TodoPill>
                                    <Title>{todo.titulo}</Title>
                                    <Description>
                                        {`${todo.descripcion}    ${dia}/${mes}/${year}  ${hora}`}
                                    </Description>
                                </TodoPill>
                                <DeleteTodoButton
                                    onClick={() => handleClick(todo._id)}
                                >
                                    Borrar tarea
                                </DeleteTodoButton>
                            </TodoItem>
                        );
                    })}
                </TodoList>
            )}
        </Container>
    );
}
const Center = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`;
const TodoList = styled.ul`
    list-style: none;
    padding: 0;
`;
const TodoItem = styled.li`
    display: flex;
    flex-direction: row;
    margin: 1vh;
    padding: 1vh;
    border: 1px solid gray;
    align-items: center;
`;
const UploadTodoButton = styled.button`
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

const Container = styled.div`
    width: 100%;
    padding: 5vh 10vh 5vh 10vh;
`;
const DeleteTodoButton = styled.button`
    padding: 1vh;
    color: white;
    background-color: tomato;
    border-radius: 2vh;
    outline: none;
    border: none;
    cursor: pointer;
    margin-left: auto;
    max-height: 10vh;
    min-height: 6vh;
    min-width: max-content;
    &:hover {
        background-color: orange;
    }
    &:focus {
        background-color: orange;
    }
`;
const TodoPill = styled.div`
    min-height: 10vh;
`;
const Title = styled.h1`
    margin: 0;
    font-size: 22px;
`;
const Description = styled.p`
    margin: 0;
`;
