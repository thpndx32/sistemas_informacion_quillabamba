import { useState } from "react";
import TuneIcon from '@mui/icons-material/Tune';
import { IconButton } from "@mui/material";
import { FormFiltros } from "./FormFiltros";



export const Filtros = () => {
    const [form,setForm] =useState(false);
    const handleClose = () => setForm(false);
    console.log(form);
    return (
        <div>
            <IconButton aria-label="filtro" onClick={()=>setForm(!form)}>
                <TuneIcon/>
            </IconButton>
            {form&&<FormFiltros show={form} handleClose={handleClose}/>}
        </div>
    );
}