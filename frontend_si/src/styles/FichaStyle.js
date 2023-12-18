import styled from "styled-components";
import { colores } from "./colors";

export const FichaStyle =  styled.div`
    display: flow;
`

export const FilaFichaStyle = styled.div`
    display:grid;
    grid-template-columns: repeat(3, 1fr);
    align-items:center;
    border-radius: 10px;
    background-color:${colores.primary};
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    padding: 5px 20px;
    font-size: 20px;
    & > * {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    ${(props)=>(props?.clase==="Fecha")?
    `grid-template-columns: 1fr;
    text-align: center;
    `
    :
    ``
    }
    ${(props)=>(props?.clase==="Producto")?
    `grid-template-columns: repeat(${props.numGrid}, 1fr);
    text-align: center;
    margin-bottom:10px;
    `
    :
    ``
    }
`

export const FichaHeaderStyle = styled.div`
    display:grid;
    grid-template-columns: repeat(${(props)=>(props?.numGrid)?props.numGrid:`3`}, 1fr);
    align-items:center;
    border-radius: 10px;
    background-color:${colores.contrast};
    color:${colores.hover};
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    padding: 5px 20px;
    font-size: 20px;
    text-transform: uppercase;
    margin: 10px 0px;
    & > * {
        display: flex;
        align-items: center;
        justify-content: center;
    }
`

export const FichaTituloStyle = styled.div`
    border-radius: 10px;
    display: flex;
    justify-content: center;
    background-color:${colores.contrast};
    color:${colores.secondary};
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    padding: 5px 20px;
    font-size: 30px;
    text-transform: uppercase;
    font-weight: bold;
    margin: 10px 0;
    ${(props)=>(props?.clase==="numeroHabitacion")?
    `background-color:${colores.primary};
    color:black;
    `
    :
    ``
    }
`
export const FichaFechaStyle = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin: 10px 0;
    & > * {
        align-items: center;
        justify-self: center;
        text-align: center;
    }
`

export const FichaTituloContenidoStyle = styled.div`
    display: flex;
    grid-gap: 10px;
    & > * {
        align-items: center;
        justify-self: center;
        text-align: center;
    }
`

export const FichaShowFilas = styled.div`
    max-height: 200px;
    overflow-y:auto;
`