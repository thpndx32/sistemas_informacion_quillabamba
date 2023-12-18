import { IconButton } from "@mui/material";
import { format } from "date-fns";
import InfoIcon from '@mui/icons-material/Info';
import { useState } from "react";
import { FormDetallesIngresos } from "./FormDetallesIngresos";
import { ElementoLista } from "../../../styles/Listado";
export const FilaIngresosTurno = ({
    fila, index
}) => {
    const fecha_hora_inicio = fila.data()?.fecha_hora.toDate();
    const fecha_hora_cierre = fila.data()?.fecha_hora_cierre?.toDate();
    const [showDetalles, setShowDetalles] = useState(false);
    const handleClose = () => {
        setShowDetalles(false);
    }
    return (
        <div>
        <ElementoLista index={index} clase="Ingresos">
            <div>
            {format(fecha_hora_inicio, 'dd-MMM-yyyy')}
            {format(fecha_hora_inicio, 'HH:mm:ss')}
            </div>
            <div>
            {fecha_hora_cierre&&format(fecha_hora_cierre, 'HH:mm:ss')}
            </div>
            <div>
            {fila.data()?.ingresos.toFixed(2)}
            </div>
            <div>
            <IconButton onClick={()=>{setShowDetalles(true)}}>
                <InfoIcon/>
            </IconButton>
            </div>
        </ElementoLista>
            {showDetalles&&<FormDetallesIngresos show={showDetalles} handleClose={handleClose} caja={fila}/>}
        </div>
    )
}