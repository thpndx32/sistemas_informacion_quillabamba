import { useEffect, useState } from "react";
import { ImageToggle } from "./ImageToggle";
import { IconButton } from "@mui/material";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { updateDoc } from "firebase/firestore";
import { Dropdownlist } from "../../Dropdownlist";

export const HabitacionFila = (
    {e,index,handleDelete,deleteArray,eliminar, habitaciones}
) => {
    const [estate, setState] = useState(false);
    const [modificar, setModificar] = useState(false);
    const [habitacion, setHabitacion] = useState(e.data()?.Numero_Habitacion);
    const [tipo, setTipo] = useState(e.data()?.tipo);
    const [precio, setPrecio] = useState(e.data()?.precio);
    const handleModificar = async () =>{
        if (!modificar){
            setModificar(!modificar);
        } else{
            await updateDoc(e.ref,{
                Numero_Habitacion: habitacion,
                tipo: tipo,
                precio: precio,
            })
            setModificar(!modificar);
        }
    }
    //console.log("delArray",index,deleteArray);
    useEffect(()=>{
        const newArray = [...deleteArray];
        //console.log("newArr",index,newArray);
        newArray[index] = estate;
        handleDelete([...newArray]);
        //console.log(index, deleteArray[index])
    },[estate]);
    useEffect(()=>{
        setHabitacion(e.data()?.Numero_Habitacion);
        setTipo(e.data()?.tipo);
        setPrecio(e.data()?.precio);
    },[modificar]);
    return (
        <div>
            {
                !modificar?(
                    <div>
                    {e.data()?.Numero_Habitacion} 
                    {e.data()?.tipo} 
                    {e.data()?.precio}
                    {eliminar&&<ImageToggle handleState={setState} index={index}/>}
                    <IconButton onClick={handleModificar}>
                        <DriveFileRenameOutlineIcon/>
                    </IconButton>
                    </div>
                ):(
                    <div>
                        {habitacion}
                        <Dropdownlist updateData={setTipo} arrData={habitaciones}
                            defaultValue={tipo}/>
                        <input value={precio} type="number" onChange={(event)=>{
                            setPrecio(event.target.value);
                        }}/>
                        <IconButton onClick={handleModificar}>
                            <DoneIcon/>
                        </IconButton>
                        <IconButton onClick={()=>{setModificar(!modificar)}}>
                            <CloseIcon/>
                        </IconButton>
                    </div>
                )
            }
        </div>
    )
}