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
import { createGlobalStyle } from "styled-components";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import AgregarTodo from "./AgregarTodo";
import AgregarVendedor from "./AgregarVendedor";
import AgregarProducto from "./AgregarProducto";
import AgregarFraccionamiento from "./AgregarFraccionamiento";
import NotaDeCredito from "./NotaDeCredito";
import Inicio from "./Inicio";
import StatusBar from "./StatusBar";
import Ajustes from "./Ajustes";
import smalltalk from "smalltalk";

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
    const [isFeria, setIsFeria] = React.useState("local");
    const [caja, setCaja] = React.useState(null);

    React.useEffect(() => {
        const us = localStorage.getItem("user");
        const isF = localStorage.getItem("isFeria");
        const cajaIniciada = localStorage.getItem("caja");
        setCaja(cajaIniciada);
        setUser(JSON.parse(us));
        if (isF === null) {
            setIsFeria("local");
        } else {
            setIsFeria(isF);
        }
    }, []);

    const defineUser = (usuarioIngresado) => {
        setUser(usuarioIngresado);
        localStorage.setItem("user", JSON.stringify(usuarioIngresado));
    };
    const logOut = async () => {
        const isCaja = localStorage.getItem("caja");
        if (isCaja === null) {
            localStorage.removeItem("user");
            localStorage.removeItem("isFeria");
            setIsFeria("local");
            setUser(undefined);
        } else {
            try {
                await smalltalk.alert(
                    "Cerrar caja",
                    "Error, debe cerrar caja antes de salir."
                );
            } catch (err) {
                console.log(err);
            }
        }
    };
    const toggleFeria = () => {
        if (isFeria === "local") {
            setIsFeria("feria");
            localStorage.setItem("isFeria", "feria");
            return "Feria";
        } else {
            setIsFeria("local");
            localStorage.setItem("isFeria", "local");
            return "Local";
        }
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
                            <StatusBar
                                user={user}
                                logOut={logOut}
                                toggleFeria={toggleFeria}
                            />
                            <Route exact path="/" component={Home} />
                            <Route path="/administrar-productos">
                                <AdministrarProductos user={user} />
                            </Route>
                            <Route path="/vender">
                                <Vender isFeria={isFeria} user={user} />
                            </Route>
                            <Route
                                path="/contabilidad"
                                component={Contabilidad}
                            />
                            <Route path="/historial" component={Historial} />
                            <Route path="/administrar-vendedores">
                                <AdministrarVendedores user={user} />
                            </Route>
                            <Route path="/fraccionamiento">
                                <Fraccionamiento user={user} />
                            </Route>
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
                            <Route path="/agregar-fraccionamiento">
                                <AgregarFraccionamiento user={user} />
                            </Route>
                            <Route path="/ajustes">
                                <Ajustes />
                            </Route>
                            <Route path="/nota-de-credito">
                                <NotaDeCredito user={user} />
                            </Route>
                            <Redirect to="/" />
                        </>
                    ) : (
                        <>
                            <Navbar />
                            <StatusBar
                                user={user}
                                logOut={logOut}
                                toggleFeria={toggleFeria}
                            />
                            <Route exact path="/" component={Home} />

                            <Route path="/vender">
                                <Vender isFeria={isFeria} user={user} />
                            </Route>

                            <Route path="/fraccionamiento">
                                <Fraccionamiento user={user} />
                            </Route>
                            <Route
                                path="/agregar-todo"
                                component={AgregarTodo}
                            />

                            <Route path="/agregar-fraccionamiento">
                                <AgregarFraccionamiento user={user} />
                            </Route>
                            <Route path="/nota-de-credito">
                                <NotaDeCredito user={user} />
                            </Route>
                            <Redirect to="/" />
                        </>
                    )}
                </Switch>
            </Router>
        </>
    );
}
