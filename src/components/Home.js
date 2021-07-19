import * as React from "react";
import styled from "styled-components";
import { productos } from "../services/apiCalls";

export default function Home() {
    const handleClick = async () => {
        console.log(await productos());
    };
    return (
        <div>
            <BotonPreuba onClick={handleClick}>Llamar api</BotonPreuba>
        </div>
    );
}

const BotonPreuba = styled.button``;
