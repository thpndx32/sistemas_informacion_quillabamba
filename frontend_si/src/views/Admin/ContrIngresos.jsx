import { useEffect, useState } from "react"
import { Retroceder } from "../../components/Retroceder"
import { FormControlLabel, Switch } from "@mui/material";

export const ContrIngresos = () =>{
    const [tipoIngreso, setTipoIngreso] =useState(false);
    const [textoIngreso, setTextoIngreso] =useState("pedidos individuales");
    useEffect(()=>{
        if(tipoIngreso) setTextoIngreso("pedidos individuales");
        else setTextoIngreso("fichas");
    },[tipoIngreso])
    return (
        <div>
            <Retroceder/>
            <FormControlLabel
            control={<Switch
                checked={tipoIngreso}
                onChange={()=>{setTipoIngreso(!tipoIngreso)}}
            />} label={textoIngreso}
            />
            
            ingresos
        </div>
    )
}