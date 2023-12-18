import styled from "styled-components";
import { colores } from "./colors";

export const Listado = styled.div`
    width: 80%;
    min-height: 90vh;
    background-color: ${colores.primary};
    margin-top: 50px;
    padding: 10px 30px;
    border-radius: 20px;
    ${(props)=>(props?.clase==="Caja")?
    `display:grid;`
    :
    ``
    }
`
export const ElementoLista = styled.div`
    width: 100%;
    height: 100%;
    background-color: ${(props)=>(props?.index||props?.index>-1)?colores.hover:colores.contrast};
    color: ${(props)=>(props?.index||props?.index>-1)?"black":colores.hover} ;
    display: grid;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    padding: 10px 100px;
    font-size: 20px;
    text-transform: uppercase;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 4px;
    ${(props)=>(props?.index||props?.index>-1)?
    `margin-top: 15px;`
    :
    ``
    }
    & > * {
        display: flex;
        align-items: center;
        justify-content: right;
    }
    div {
        text-align: right;
    }
    input {
        width: 70%;
        text-align: right;
        justify-self: right;
    }
    select {
        width: auto;
        text-align: right;
        justify-self: right;
    }
    ${(props)=>(props?.clase==="Habitaciones")?
    `grid-template-columns: 2fr 1fr 2fr 2fr;`
    :
    ``
    }
    ${(props)=>(props?.clase==="Productos")?
    `grid-template-columns: 3fr repeat(2, 2fr) 3fr 2fr;`
    :
    ``
    }
    ${(props)=>(props?.clase==="Ingresos")?
    `grid-template-columns: 3fr repeat(3, 2fr)`
    :
    ``
    }
`

export const ListadoBarraStyle = styled.div`
    max-height: 800px;
    overflow-y: auto;
    display: grid;
    padding: 10px;
    grid-gap: 5px;
    ${(props)=>(props?.maxHeight)?
    `max-height: ${props?.maxHeight}px`
    :
    ``
    }
`

export const ElementoListadoBarraStyle = styled.div`
    display: grid;
    background-color:${colores.primary};
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    align-items: center;
    grid-template-columns: 2fr repeat(2, 1fr);
    padding: 5px 20px;
    grid-gap: 10px;
    & > *{
        text-align: center;
        justify-self: center;
    }
    ${(props)=>(props?.clase==="RecibosHeader")?
    `background-color:${colores.contrast};
    color:${colores.hover};
    text-transform: uppercase;
    margin: 10px 25px 0px 10px;
    `
    :
    ``
    }
    ${(props)=>(props?.fontSize)?
        `font-size: ${props?.fontSize}px`
        :
        ``
        }
    ${(props)=>(props?.clase==="Recibos")?
    `align-items: start;
    `
    :
    ``
    }
    ${(props)=>(props?.clase==="Header")?
    `background-color:${colores.contrast};
    color:${colores.hover};
    text-transform: uppercase;
    grid-template-columns: repeat(4, 1fr);
    font-size: 20px;
    margin: 0px 10px;
    `
    :
    ``
    }
    ${(props)=>(props?.clase==="Fichas")?
    `grid-template-columns: repeat(4, 1fr);
    `
    :
    ``
    }
`