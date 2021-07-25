import * as React from "react";
import Navbar from "./Navbar";
import {
    HashRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import Home from "./Home";
import AdministrarProductos from "./AdministarProductos";
import Contabilidad from "./Contabilidad";
import Historial from "./Historial";
import Vender from "./Vender";
import AdministrarVendedores from "./AdministrarVendedores";
import Fraccionamiento from "./Fraccionamiento";
import styled, { createGlobalStyle } from "styled-components";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import AgregarTodo from "./AgregarTodo";
import AgregarVendedor from "./AgregarVendedor";
import AgregarProducto from "./AgregarProducto";
import AgregarFraccionamiento from "./AgregarFraccionamiento";
import Inicio from "./Inicio";
import StatusBar from "./StatusBar";

const GlobalStyle = createGlobalStyle`
  html, body, #root {
    width: 100%;
    min-height: 100vh;
    margin: 0;
    padding: 0;
    background-color: white;
  }
  *{
      box-sizing: border-box;
      font-family: 'Heebo', sans-serif;
      font-size: 15px;
  }
`;

export default function App() {
    const [user, setUser] = React.useState(undefined);

    React.useEffect(() => {
        const us = localStorage.getItem("user");
        setUser(JSON.parse(us));
    }, []);

    const defineUser = (usuarioIngresado) => {
        setUser(usuarioIngresado);
        localStorage.setItem("user", JSON.stringify(usuarioIngresado));
    };
    const logOut = () => {
        localStorage.removeItem("user");
        setUser(undefined);
    };

    return (
        <>
            <Router>
                <GlobalStyle />
                <Switch>
                    {!user ? (
                        <>
                            <Route exact path="/">
                                <Inicio defineUser={defineUser} />
                            </Route>
                            <Route
                                path="/agregar-vendedor"
                                component={AgregarVendedor}
                            />
                            <Redirect to="/" />
                        </>
                    ) : user.rol === "admin" ? (
                        <>
                            <Navbar isAdmin />
                            <StatusBar user={user} logOut={logOut} />
                            <Route exact path="/" component={Home} />
                            <Route
                                path="/administrar-productos"
                                component={AdministrarProductos}
                            />
                            <Route path="/vender" component={Vender} />
                            <Route
                                path="/contabilidad"
                                component={Contabilidad}
                            />
                            <Route path="/historial" component={Historial} />
                            <Route path="/administrar-vendedores">
                                <AdministrarVendedores user={user} />
                            </Route>
                            <Route
                                path="/fraccionamiento"
                                component={Fraccionamiento}
                            />
                            <Route
                                path="/agregar-todo"
                                component={AgregarTodo}
                            />
                            <Route
                                path="/agregar-vendedor"
                                component={AgregarVendedor}
                            />
                            <Route
                                path="/agregar-producto"
                                component={AgregarProducto}
                            />
                            <Route
                                path="/agregar-fraccionamiento"
                                component={AgregarFraccionamiento}
                            />
                            <Redirect to="/" />
                        </>
                    ) : (
                        <>
                            <Navbar />
                            <StatusBar user={user} logOut={logOut} />
                            <Route exact path="/" component={Home} />

                            <Route path="/vender" component={Vender} />

                            <Route
                                path="/fraccionamiento"
                                component={Fraccionamiento}
                            />
                            <Route
                                path="/agregar-todo"
                                component={AgregarTodo}
                            />

                            <Route
                                path="/agregar-fraccionamiento"
                                component={AgregarFraccionamiento}
                            />
                            <Redirect to="/" />
                        </>
                    )}
                </Switch>
            </Router>
        </>
    );
}
const LogOut = styled.button`
    border-radius: 50%;
    width: 7vh;
    height: 7vh;
`;
