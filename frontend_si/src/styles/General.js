import styled, { keyframes } from 'styled-components';
import { colores } from './colors';

const growAnimation = keyframes`
  from {
    transform: scale(1);
  }

  to {
    transform: scale(1.05);
  }
`;

export const Salir = styled.button`
    width: 20vh;
    background-color: ${colores.secondary};
    border: 0px solid;
    font-weight: bold;
    letter-spacing: 1px;
    font-size: 20px;
    color: ${colores.contrast};
    &:hover {
        filter: brightness(1.1);
    }    
`;

export const OpcionesAdmin = styled.button`
    background-color: ${colores.secondary};
    color: ${colores.contrast};
    text-transform: uppercase;
    font-weight: bold;
    width: 45vh;
    font-size: 45px;
    height: 15vh;
    border: 0px solid;
    border-radius: 30px;
    &:hover {
        background-color: ${colores.hover};
        color: ${colores.secondary};
        animation: ${growAnimation} 0.3s ease forwards;
        border: 5px solid;
    }    
`

export const AdminDiv = styled.div`
    box-sizing: border-box;
    display: flex;
    height: 95vh;
    width: 100%;
    min-height: 100%;
    justify-content: space-around;
    margin: auto;
    align-items: center;
    background-color: ${colores.primary};
`;


export const General = styled.div`
    box-sizing: border-box;
    min-height: 100vh;
    height: 100%;
    padding: 20px;
    background-color: ${colores.contrast};
    justify-content: center;
    font-family: Helvetica;
    display: flex;
    align-items: center;
`;
