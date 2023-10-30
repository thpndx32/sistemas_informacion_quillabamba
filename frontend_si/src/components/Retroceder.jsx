import { IconButton } from "@mui/material"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";

export const Retroceder =  (
    {toDo}
) =>{
    const nav = useNavigate();
    return (
        toDo?<IconButton onClick={()=>toDo()}>
            <ArrowBackIcon/>
        </IconButton>:
        <IconButton onClick={()=>nav("..",{relative:"path"})}>
            <ArrowBackIcon/>
        </IconButton>
    )
}