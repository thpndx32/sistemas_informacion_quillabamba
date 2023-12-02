import { useEffect, useState } from "react"
import { Dropdownlist } from "../Dropdownlist";
import { habitaciones } from "../../views/Admin/Habitaciones";
import { estadosHabitaciones } from "../MostrarHabs";
import { IconButton } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';

export const InputFiltro = ({
    Filtro, setOperacion, setValorFiltro, valorFiltro, handleAddFiltro, Operacion
}) =>{
    const operaciones = ["==", "!=", "<", ">", "<=", ">="];
    const nombresOperaciones = ["Igual", "Diferente", "Menor", "Mayor", "Menor o igual", "Mayor o igual"];
    const [nombreOperacion, setNombreOperacion] = useState("Igual");
    useEffect(()=>{
        const index = nombresOperaciones.indexOf(nombreOperacion);
        if(Operacion!==operaciones[index])setOperacion(operaciones[index]);
        //console.log(operaciones[index]);
    },[nombreOperacion])
    useEffect(()=>{
        if(Filtro==="tipo"||Filtro==="estado"){
            setNombreOperacion(nombresOperaciones[0]);
            setOperacion(operaciones[0]);
            setValorFiltro("");
        } else {
            setNombreOperacion(nombresOperaciones[2]);
            setOperacion(operaciones[2]);
            setValorFiltro(0);
        }
    },[Filtro])
    return (
        <>
            {(Filtro==="precio"||Filtro==="Numero_Habitacion")?
            <>
                <Dropdownlist updateData={setNombreOperacion} defaultValue={nombreOperacion} arrData={nombresOperaciones.slice(2)}/>
                <p> a </p>
            </>
            :
            <>
                <Dropdownlist updateData={setNombreOperacion} defaultValue={nombreOperacion} arrData={nombresOperaciones.slice(0,2)}/>
                <p>a</p>
            </>
            }
            {
                (Filtro==="precio"||Filtro==="Numero_Habitacion")&&<input type="numero" value={valorFiltro} onChange={(e)=>{setValorFiltro(e.target.value)}}/>
            }
            {
                Filtro==="tipo"&&<Dropdownlist updateData={setValorFiltro} arrData={habitaciones}/>
            }
            {
                Filtro==="estado"&&<Dropdownlist updateData={setValorFiltro} arrData={estadosHabitaciones}/>
            }
            {(Filtro==="precio"||Filtro==="Numero_Habitacion")?
            <IconButton onClick={()=>{handleAddFiltro(parseInt(valorFiltro))}}>
                <CheckIcon/>
            </IconButton>:
            <IconButton onClick={()=>{handleAddFiltro(valorFiltro)}}>
                <CheckIcon/>
            </IconButton>}
        </>
    )
}