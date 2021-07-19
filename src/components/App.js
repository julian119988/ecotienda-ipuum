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
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html, body, #root {
    width: 100%;
    min-height: 100vh;
    margin: 0;
    padding: 0;
  }
  *{
      box-sizing: border-box;
  }
`;

export default function App() {
    return (
        <>
            <Router>
                <GlobalStyle />
                <Navbar />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route
                        path="/administrar-productos"
                        component={AdministrarProductos}
                    />
                    <Route path="/vender" component={Vender} />
                    <Route path="/contabilidad" component={Contabilidad} />
                    <Route path="/historial" component={Historial} />
                    <Route
                        path="/administrar-vendedores"
                        component={AdministrarVendedores}
                    />
                    <Redirect to="/" />
                </Switch>
            </Router>
        </>
    );
}