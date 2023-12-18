import styled from "styled-components";
import { colores } from "./colors";

export const LoginButton = styled.button`
    position: absolute;
`
export const LoginBoxStyle = styled.div`
    width: 80%;
    min-height: 40vh;
    height: 100%;
    background-color: ${colores.primary};
    margin-top: 50px;
    padding: 10px 30px;
    border-radius: 20px;
    display: grid;
    font-size: 40px;
    align-items: center;
    justify-content: center;
`
export const SwitchStyle = styled.label`
    font-size: 30px;
    text-transform: uppercase;
    align-items: center;
    display: flex;
`