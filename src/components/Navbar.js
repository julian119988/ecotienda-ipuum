import * as React from "react";
import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
    return (
        <Nav>
            <NavList>
                <ItemList>
                    <NavLink
                        to="/"
                        exact={true}
                        activeStyle={{
                            backgroundColor: "orange",
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
                        }}
                    >
                        Contabilidad
                    </NavLink>
                </ItemList>
            </NavList>
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
    }
`;
