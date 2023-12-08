import { IconButton } from "@mui/material";
import { format } from "date-fns";
import InfoIcon from '@mui/icons-material/Info';
import { useState } from "react";
import { FormDetallesIngresos } from "./FormDetallesIngresos";
export const FilaIngresosTurno = ({
    fila
}) => {
    const fecha_hora_inicio = fila.data()?.fecha_hora.toDate();
    const fecha_hora_cierre = fila.data()?.fecha_hora_cierre?.toDate();
    const [showDetalles, setShowDetalles] = useState(false);
    const handleClose = () => {
        setShowDetalles(false);
    }
    return (
        <div>
            {format(fecha_hora_inicio, 'dd-MMM-yyyy')}
            {format(fecha_hora_inicio, 'HH:mm:ss')}
            {fecha_hora_cierre&&format(fecha_hora_cierre, 'HH:mm:ss')}
            {fila.data()?.ingresos}
            <IconButton onClick={()=>{setShowDetalles(true)}}>
                <InfoIcon/>
            </IconButton>
            {showDetalles&&<FormDetallesIngresos show={showDetalles} handleClose={handleClose} caja={fila}/>}
        </div>
    )
}