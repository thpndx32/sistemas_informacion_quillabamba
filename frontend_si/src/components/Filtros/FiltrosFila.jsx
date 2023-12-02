import { IconButton } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';

export const FiltrosFila = ({
    index,filtro,handleBorrar
}) => {
    return (
        <div key={index}>
            {filtro.field}
            {filtro.operacion}
            {filtro.value}
            <IconButton onClick={()=>handleBorrar(index)}>
                <CloseIcon/>
            </IconButton>
        </div>
    )
}