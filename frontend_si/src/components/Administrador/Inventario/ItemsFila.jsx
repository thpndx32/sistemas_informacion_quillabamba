import { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { updateDoc } from "firebase/firestore";
import { Dropdownlist } from "../../Dropdownlist";
import { ImageToggle } from "../Habitacion/ImageToggle";

export const ItemsFila = (
    {e,index,handleDelete,deleteArray,eliminar, data}
) => {
    const [nombre, setNombre] = useState(e.data()?.Nombre);
    const [cantidad, setCantidad] = useState(e.data()?.Cantidad);
    const [comerciabilidad, setComerciabilidad] = useState(e.data()?.Estado);
    const [estate, setState] = useState(false);
    const [modificar, setModificar] = useState(false);
    const [precio, setPrecio] = useState(e.data()?.Precio);
    const handleModificar = async () =>{
        if (!modificar){
            setModificar(!modificar);
        } else{
            await updateDoc(e.ref,{
                Nombre: nombre,
                Cantidad: cantidad,
                Estado: comerciabilidad,
                Precio: precio,
            })
            setModificar(!modificar);
        }
    }
    //console.log("delArray",index,deleteArray);
    useEffect(()=>{
        const newArray = [...deleteArray];
        console.log("estate",estate);
        newArray[index] = estate;
        console.log("newArr",index,newArray);
        handleDelete(newArray);
        //console.log(index, deleteArray[index])
    },[estate]);
    useEffect(()=>{
        setNombre(e.data()?.Nombre);
        setCantidad(e.data()?.Cantidad);
        setPrecio(e.data()?.Precio);
        setComerciabilidad(e.data()?.Estado);
    },[modificar]);
    return (
        <div>
            {
                !modificar?(
                    <div>
                    {e.data()?.Nombre} 
                    {e.data()?.Cantidad} 
                    {e.data()?.Precio}
                    {e.data()?.Estado.toString()}
                    {eliminar&&<ImageToggle handleState={setState} index={index}/>}
                    <IconButton onClick={handleModificar}>
                        <DriveFileRenameOutlineIcon/>
                    </IconButton>
                    </div>
                ):(
                    <div>
                        <input value={nombre} type="text" onChange={(event)=>{
                            setNombre(event.target.value);
                        }}/>
                        <input value={cantidad} type="number" onChange={(event)=>{
                            setCantidad(event.target.value);
                        }}/>
                        <input value={precio} type="number" onChange={(event)=>{
                            setPrecio(event.target.value);
                        }}/>
                        <Dropdownlist updateData={setComerciabilidad} arrData={data}
                            defaultValue={comerciabilidad.toString()}/>
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