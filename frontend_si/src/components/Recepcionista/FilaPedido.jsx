import ClearIcon from '@mui/icons-material/Clear';
import { IconButton } from '@mui/material';
export const FilaPedido = (
    {order,index,elim}
) =>{
    return (
        <div key={index}>
        {order[0].data()?.Nombre}
        {order[1]}
        <IconButton onClick={()=>{
            elim(index);
            console.log("eliminado");
            }}>
            <ClearIcon/>
        </IconButton>
        </div>
    )
}