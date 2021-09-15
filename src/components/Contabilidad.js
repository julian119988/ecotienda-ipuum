import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import TablaEmpleados from "./Contabilidad/TablaEmpleados";

export default function Contabilidad() {
    const [showTablaEmpleados, setShowTablaEmpleados] = useState(false);
    const [showTablaProveedores, setShowTablaProveedores] = useState(false);
    const [showTablaIpuum, setShowTablaIpuum] = useState(false);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

    useEffect(() => {
        console.log(selectedMonth, selectedYear);
    });
    return (
        <>
            <FiltrosDiv>
                <RowContainer>
                    <TabToggleTabla
                        onClick={() =>
                            setShowTablaEmpleados(!showTablaEmpleados)
                        }
                        isActive={showTablaEmpleados}
                    >
                        Tabla empleados
                    </TabToggleTabla>
                    <TabToggleTabla
                        onClick={() =>
                            setShowTablaProveedores(!showTablaProveedores)
                        }
                        isActive={showTablaProveedores}
                    >
                        Tabla proveedores
                    </TabToggleTabla>
                    <TabToggleTabla
                        onClick={() => setShowTablaIpuum(!showTablaIpuum)}
                        isActive={showTablaIpuum}
                    >
                        Tabla IPUUM
                    </TabToggleTabla>
                </RowContainer>
                <FiltroFechaDiv>
                    <MonthDiv>
                        <MonthTitle>Ingrese el mes</MonthTitle>
                        <Select
                            defaultValue={new Date().getMonth()}
                            onChange={(event) =>
                                setSelectedMonth(parseInt(event.target.value))
                            }
                        >
                            <Option value={0}>Enero</Option>
                            <Option value={1}>Febrero</Option>
                            <Option value={2}>Marzo</Option>
                            <Option value={3}>Abril</Option>
                            <Option value={4}>Mayo</Option>
                            <Option value={5}>Junio</Option>
                            <Option value={6}>Julio</Option>
                            <Option value={7}>Agosto</Option>
                            <Option value={8}>Septiembre</Option>
                            <Option value={9}>Octubre</Option>
                            <Option value={10}>Noviembre</Option>
                            <Option value={11}>Diciembre</Option>
                        </Select>
                    </MonthDiv>
                    <YearDiv>
                        <YearTitle>Ingrse el año</YearTitle>
                        <Select
                            defaultValue={new Date().getFullYear()}
                            onChange={(event) =>
                                setSelectedYear(parseInt(event.target.value))
                            }
                        >
                            <Option value={new Date().getFullYear() - 1}>
                                {new Date().getFullYear() - 1}
                            </Option>
                            <Option value={new Date().getFullYear()}>
                                {new Date().getFullYear()}
                            </Option>
                            <Option value={new Date().getFullYear() + 1}>
                                {new Date().getFullYear() + 1}
                            </Option>
                        </Select>
                    </YearDiv>
                </FiltroFechaDiv>
            </FiltrosDiv>
            {showTablaEmpleados ? (
                <TablaEmpleados month={selectedMonth + 1} year={selectedYear} />
            ) : (
                ""
            )}
        </>
    );
}
const TabToggleTabla = styled.button`
    width: 33.33%;
    height: 10vh;
    outline: none;
    border-left: 1px solid white;
    border-right: 1px solid white;
    border-top: 1px solid white;
    border-bottom: none;
    color: white;
    background-color: tomato;
    border-radius: 5vh 5vh 0 0;
    cursor: pointer;
    ${(props) =>
        props.isActive
            ? "background-color: orange;"
            : `&:hover {
        background-color: wheat;
    }`}
`;

const FiltrosDiv = styled.div`
    display: flex;
    width: 100%;
    height: 20vh;
    flex-direction: column;
    background-color: tomato;
`;
const RowContainer = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
`;
const FiltroFechaDiv = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    justify-content: space-evenly;
    align-items: center;
`;
const YearDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
const MonthDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
const YearTitle = styled.h4`
    margin: 0;
    padding: 0;
    color: white;
    font-size: 25px;
`;
const MonthTitle = styled.h4`
    margin: 0;
    padding: 0;
    color: white;
    font-size: 25px;
`;
const Select = styled.select`
    height: 3vh;
    margin-top: 2vh;
`;
const Option = styled.option``;
