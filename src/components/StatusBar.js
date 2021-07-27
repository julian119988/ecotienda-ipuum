import React, { useEffect, useState } from "react";
import styled from "styled-components";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";

export default function StatusBar(props) {
    const [fecha, setFecha] = useState();
    const [tiempo, setTiempo] = useState();
    const [isFeria, setIsFeria] = useState();

    useEffect(() => {
        const interval = setInterval(() => {
            const currentTime = new Date().toLocaleTimeString().slice(0, -3);
            if (tiempo !== currentTime) {
                setFecha(new Date().toLocaleDateString());
                setTiempo(currentTime);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const isF = localStorage.getItem("isFeria");
        if (isF === null) {
            setIsFeria("Local");
        } else if (isF === "feria") {
            setIsFeria("Feria");
        } else {
            setIsFeria("Local");
        }
        setFecha(new Date().toLocaleDateString());
        setTiempo(new Date().toLocaleTimeString().slice(0, -3));
    }, []);
    const handleClick = () => {
        setIsFeria(props.toggleFeria());
    };
    return (
        <GoBackBar>
            <Fecha>{`${fecha} ${tiempo}`}</Fecha>
            <CambiarFeriaLocal onClick={handleClick} isFeria={isFeria}>
                {isFeria}
            </CambiarFeriaLocal>
            <UserInfo>{props.user.nombre}</UserInfo>
            <LogOutButton onClick={() => props.logOut()}>
                Salir
                <RemoveCircleOutlineIcon
                    style={{ height: "8vh", width: "8vh" }}
                />
            </LogOutButton>
        </GoBackBar>
    );
}
const CambiarFeriaLocal = styled.button`
    width: 10%;
    height: 100%;
    font-size: 17px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: auto;
    margin-right: auto;
    outline: none;
    border: none;
    color: white;
    cursor: pointer;
    border-radius: 5vh 5vh 0 0;
    ${(props) =>
        props.isFeria === "Local"
            ? "background-color: tomato;"
            : `background-color: orange;
                border: 1px solid white;
`}
    &:hover {
        background-color: wheat;
    }
`;
const Fecha = styled.div`
    width: 10%;
    height: 100%;
    font-size: 17px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 4vh;
`;
const LogOutButton = styled.button`
    width: 15%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    background-color: orange;
    outline: none;
    border: none;
    cursor: pointer;
    margin: 0;
    padding: 0;
    color: white;
    font-size: 17px;
    transition: all 0.2s linear;
    border-radius: 5vh 0 0 0;
    font-weight: 900;
    border-left: 1px solid white;
    border-top: 1px solid white;
    &:active {
        color: black;
        background-color: red;
    }
`;
const UserInfo = styled.div`
    width: 10%;
    height: 100%;
    font-size: 20px;
    font-weight: 300;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: auto;
`;
const GoBackBar = styled.div`
    width: 100%;
    height: 10vh;
    background-color: tomato;
    color: white;
    display: flex;
    flex-direction: row;
`;
