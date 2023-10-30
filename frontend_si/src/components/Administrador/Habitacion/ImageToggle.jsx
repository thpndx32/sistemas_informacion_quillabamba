import { IconButton } from "@mui/material";
import { useEffect, useState } from "react"
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

export const ImageToggle = (
    {handleState,index}
) =>{
    const handleToggle = () => {
        handleState(!eliminar);
        setEliminar(!eliminar);
    }
    const [eliminar,setEliminar] = useState(false);
    //console.log(index, eliminar);
    return (
        <IconButton onClick={()=>{handleToggle()}}>
            {eliminar?
                <CheckBoxIcon/>
            :
                <CheckBoxOutlineBlankIcon/>
            }
        </IconButton>
    )
}