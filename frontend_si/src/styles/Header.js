import styled from "styled-components";
import { colores } from "./colors";

export const Header = styled.div`
    min-height: 50px;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: ${colores.secondary};
    display: flex;
    align-items: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    z-index: 10;
    padding: 0 20px;
`