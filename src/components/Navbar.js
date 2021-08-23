import * as React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

export default function Navbar(props) {
    return (
        <Nav>
            {props.isAdmin ? (
                <NavList>
                    <ItemList>
                        <NavLink
                            to="/"
                            exact={true}
                            activeStyle={{
                                backgroundColor: "orange",
                                borderLeft: "1px solid white",
                                borderBottom: "1px solid white",
                                borderRight: "1px solid white",
                                borderRadius: "0 0 5vh 0",
                            }}
                        >
                            Home
                        </NavLink>
                    </ItemList>
                    <ItemList>
                        <NavLink
                            to="vender"
                            activeStyle={{
                                backgroundColor: "orange",
                                borderLeft: "1px solid white",
                                borderBottom: "1px solid white",
                                borderRight: "1px solid white",
                                borderRadius: "0 0 5vh 5vh",
                            }}
                        >
                            Vender
                        </NavLink>
                    </ItemList>
                    <ItemList>
                        <NavLink
                            to="administrar-productos"
                            activeStyle={{
                                backgroundColor: "orange",
                                borderLeft: "1px solid white",
                                borderBottom: "1px solid white",
                                borderRight: "1px solid white",
                                borderRadius: "0 0 5vh 5vh",
                            }}
                        >
                            Administar Productos
                        </NavLink>
                    </ItemList>
                    <ItemList>
                        <NavLink
                            to="administrar-vendedores"
                            activeStyle={{
                                backgroundColor: "orange",
                                borderLeft: "1px solid white",
                                borderBottom: "1px solid white",
                                borderRight: "1px solid white",
                                borderRadius: "0 0 5vh 5vh",
                            }}
                        >
                            Administar Vendedores
                        </NavLink>
                    </ItemList>
                    <ItemList>
                        <NavLink
                            to="historial"
                            activeStyle={{
                                backgroundColor: "orange",
                                borderLeft: "1px solid white",
                                borderBottom: "1px solid white",
                                borderRight: "1px solid white",
                                borderRadius: "0 0 5vh 5vh",
                            }}
                        >
                            Historial
                        </NavLink>
                    </ItemList>

                    <ItemList>
                        <NavLink
                            to="contabilidad"
                            activeStyle={{
                                backgroundColor: "orange",
                                borderLeft: "1px solid white",
                                borderBottom: "1px solid white",
                                borderRight: "1px solid white",
                                borderRadius: "0 0 5vh 5vh",
                            }}
                        >
                            Contabilidad
                        </NavLink>
                    </ItemList>
                    <ItemList>
                        <NavLink
                            to="fraccionamiento"
                            activeStyle={{
                                backgroundColor: "orange",
                                borderLeft: "1px solid white",
                                borderBottom: "1px solid white",
                                borderRight: "1px solid white",
                                borderRadius: "0 0 0 5vh",
                            }}
                        >
                            Fraccionamiento
                        </NavLink>
                    </ItemList>
                    <ItemList>
                        <NavLink
                            to="ajustes"
                            activeStyle={{
                                backgroundColor: "orange",
                                borderLeft: "1px solid white",
                                borderBottom: "1px solid white",
                                borderRight: "1px solid white",
                                borderRadius: "0 0 0 5vh",
                            }}
                        >
                            Ajustes
                        </NavLink>
                    </ItemList>
                </NavList>
            ) : (
                <NavList>
                    <ItemList>
                        <NavLink
                            to="/"
                            exact={true}
                            activeStyle={{
                                backgroundColor: "orange",
                                borderLeft: "1px solid white",
                                borderBottom: "1px solid white",
                                borderRight: "1px solid white",
                                borderRadius: "0 0 5vh 0",
                            }}
                        >
                            Home
                        </NavLink>
                    </ItemList>
                    <ItemList>
                        <NavLink
                            to="vender"
                            activeStyle={{
                                backgroundColor: "orange",
                                borderLeft: "1px solid white",
                                borderBottom: "1px solid white",
                                borderRight: "1px solid white",
                                borderRadius: "0 0 5vh 5vh",
                            }}
                        >
                            Vender
                        </NavLink>
                    </ItemList>
                    <ItemList>
                        <NavLink
                            to="fraccionamiento"
                            activeStyle={{
                                backgroundColor: "orange",
                                borderLeft: "1px solid white",
                                borderBottom: "1px solid white",
                                borderRight: "1px solid white",
                                borderRadius: "0 0 0 5vh",
                            }}
                        >
                            Fraccionamiento
                        </NavLink>
                    </ItemList>
                </NavList>
            )}
        </Nav>
    );
}

const Nav = styled.nav`
    width: 100%;
    height: 10vh;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    background-color: #ffff;
`;
const NavList = styled.ul`
    list-style: none;
    display: flex;
    flex-direction: row;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    justify-content: space-evenly;
    background-color: tomato;
`;

const ItemList = styled.li`
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;

    a {
        text-decoration: none;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        text-align: center;
        transition: border-radius 100ms linear;
        border-radius: 0 0 5vh 5vh;
        &:hover {
            background-color: wheat;
        }
        &:focus {
            background-color: wheat;
        }
    }
`;
