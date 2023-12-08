import { Button } from "@mui/material"
import { useEffect, useState } from "react";
import { CompareDates } from "../../util/CompareDates";

export const ModificarEstadia = ({
    Final_Estadia
})=>{
    const [fechaActual, setFechaActual] = useState(new Date());
    const [fechaFinal, setFechaFinal] = useState(new Date());
    const actualizarFecha = () => {
        setFechaActual(new Date());
    };
    useEffect(() => {
        setInterval(actualizarFecha, 1000);
    }, []);
    useEffect(()=>{
        const arrSalida = Final_Estadia;
        setFechaFinal(arrSalida[arrSalida.length-1].toDate());
    },[])
    const handleModificar = async() =>{
        const arrSalida = Final_Estadia
        const fechaFinalLocal = arrSalida[arrSalida.length-1].toDate();
    }
    return(
        <Button onClick={handleModificar} disabled={CompareDates(fechaFinal, fechaActual)?!fechaActual.getHours()<12:false}>
            Modificar estadia
        </Button>
    )
}