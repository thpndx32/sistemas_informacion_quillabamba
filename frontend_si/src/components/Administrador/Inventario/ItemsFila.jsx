import { useEffect, useState } from "react";
import { IconButton, Switch } from "@mui/material";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import AddIcon from '@mui/icons-material/Add';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { updateDoc } from "firebase/firestore";
import RemoveIcon from '@mui/icons-material/Remove';
import { Dropdownlist } from "../../Dropdownlist";
import { ImageToggle } from "../Habitacion/ImageToggle";
import { ElementoLista } from "../../../styles/Listado";

export const ItemsFila = (
    {e,index,handleDelete,deleteArray,eliminar, data}
) => {
    const [cantidad, setCantidad] = useState(e.data()?.Cantidad);
    const [comerciabilidad, setComerciabilidad] = useState(e.data()?.Comerciabilidad);
    const [estate, setState] = useState(false);
    const [modificar, setModificar] = useState(false);
    const [precio, setPrecio] = useState(e.data()?.Precio);
    const handleModificar = async () =>{
        if (!modificar){
            setModificar(!modificar);
        } else{
            await updateDoc(e.ref,{
                Cantidad: cantidad,
                Comerciabilidad: comerciabilidad,
                Precio: precio,
            })
            setModificar(!modificar);
        }
    }
    const handleAdd = async () =>{
        await updateDoc(e.ref,{
            Cantidad: cantidad+1,
        });
        setCantidad(cantidad+1);
    }
    const handleMinus = async () =>{
        await updateDoc(e.ref,{
            Cantidad: cantidad-1,
        });
        setCantidad(cantidad-1);
    }
    //console.log("delArray",index,deleteArray);
    useEffect(()=>{
        const newArray = [...deleteArray];
        //console.log("estate",estate);
        newArray[index] = estate;
        //console.log("newArr",index,newArray);
        handleDelete(newArray);
        //console.log(index, deleteArray[index])
    },[estate]);
    useEffect(()=>{
        setCantidad(e.data()?.Cantidad);
        setPrecio(e.data()?.Precio);
        setComerciabilidad(e.data()?.Comerciabilidad);
    },[modificar]);
    return (
        <ElementoLista index={index} clase="Productos">
            {
                !modificar?(
                    <>
                        <div>
                        {e.data()?.Nombre}
                        </div>
                        <div>
                            <IconButton onClick={handleMinus} disabled={cantidad===0}>
                                <RemoveIcon/>
                            </IconButton>
                            {e.data()?.Cantidad} 
                            <IconButton onClick={handleAdd}>
                                <AddIcon/>
                            </IconButton>
                        </div>
                        <div>
                        {e.data()?.Precio.toFixed(2)}
                        </div>
                        <div>
                        {e.data()?.Comerciabilidad?<>Comerciable</>:<>No comerciable</>}
                        </div>
                        <div>
                        {eliminar&&<ImageToggle handleState={setState} index={index}/>}
                        <IconButton onClick={handleModificar}>
                            <DriveFileRenameOutlineIcon/>
                        </IconButton>
                        </div>
                    </>
                ):(
                    <>
                        <div>
                            {e.data()?.Nombre}
                        </div>
                        <input value={cantidad} type="number" onChange={(event)=>{
                            setCantidad(parseInt(event.target.value));
                        }}/>
                        <input value={precio.toFixed(2)} type="number" onChange={(event)=>{
                            setPrecio(parseFloat(event.target.value));
                        }}/>
                        <div>
                            <Switch checked={comerciabilidad} onChange={()=>setComerciabilidad(!comerciabilidad)}
                                inputProps={{ 'aria-label': 'controlled' }}/>
                            <label>{`${comerciabilidad?"Comerciable":"No comerciable"}`}</label>
                        </div>
                        
                        <div>
                            <IconButton onClick={handleModificar}>
                                <DoneIcon/>
                            </IconButton>
                            <IconButton onClick={()=>{setModificar(!modificar)}}>
                                <CloseIcon/>
                            </IconButton>
                        </div>
                    </>
                )
            }
        </ElementoLista>
    )
}