import React, { useEffect, useState } from "react";
import styled from "styled-components";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";

export default function StatusBar(props) {
    const [fecha, setFecha] = useState();
    const [tiempo, setTiempo] = useState();

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
        setFecha(new Date().toLocaleDateString());
        setTiempo(new Date().toLocaleTimeString().slice(0, -3));
    }, []);
    return (
        <GoBackBar>
            <Fecha>{`${fecha} ${tiempo}`}</Fecha>
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
