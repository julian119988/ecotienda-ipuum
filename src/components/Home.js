import * as React from "react";
import styled from "styled-components";
import Loader from "react-loader-spinner";
import {
    getProductos,
    uploadProducto,
    uploadTodo,
    getTodo,
    deleteTodo,
} from "../services/apiCalls";
import { useHistory } from "react-router-dom";

export default function Home() {
    const [todos, setTodos] = React.useState(undefined);
    const handleClick = async () => {
        console.log(await deleteTodo("60f6dd621055f126565f6e41"));
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
                <Loader
                    type="Puff"
                    color="#00BFFF"
                    height={100}
                    width={100}
                    timeout={3000} //3 secs
                />
            ) : (
                <TodoList>
                    {todos.map((todo) => {
                        return (
                            <TodoItem key={todo._id}>
                                {todo.fecha}
                                {todo.titulo}
                                {todo.descripcion}
                            </TodoItem>
                        );
                    })}
                </TodoList>
            )}
        </Container>
    );
}

const TodoList = styled.ul``;
const TodoItem = styled.li``;
const UploadTodoButton = styled.button`
    background-color: orange;
    border: none;
    border-radius: 2vh;
    padding: 2vh 4vh 2vh 4vh;
`;

const Container = styled.div`
    width: 100%;
    padding: 5vh 10vh 5vh 10vh;
`;
