import { useContext, useEffect, useState } from "react";
import { ImageToggle } from "./Administrador/Habitacion/ImageToggle";
import { Button, IconButton } from "@mui/material";

import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import FileOpenIcon from '@mui/icons-material/FileOpen';

import AddIcon from '@mui/icons-material/Add';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { Dropdownlist } from "./Dropdownlist";
import { AuthContext } from "../views/AppQuillabamba";
import { Circle } from "../styles/circle";
import { HuespedForm } from "./Recepcionista/HuespedForm";
import { firestore } from "../config/firebase";
import { Ficha } from "./Fichas/Ficha";

export const HabitacionFila = (
    {e,index,handleDelete,deleteArray,eliminar, habitaciones, estados}
) => {
    const [usr ,dataUsr, loadingDataUsr] = useContext(AuthContext);
    const colores = ["green","red","orange","gray"];
    const [estate, setState] = useState(false);
    const [modificar, setModificar] = useState(false);
    const [habitacion, setHabitacion] = useState(e.data()?.Numero_Habitacion);
    const [tipo, setTipo] = useState(e.data()?.tipo);
    const [precio, setPrecio] = useState(e.data()?.precio);
    const [estadoHab, setEstadoHab] = useState(e.data()?.estado);
    const [enUsoHab, setEnUsoHab] = useState(false);
    const [usoHab, setUsoHab] = useState(true);
    const [clientForm, setClientForm] = useState(false);
    const [ficha, setFicha] = useState(false);
    const [idFicha, setIdFicha] = useState();
    //console.log("habitacion fila");
    useEffect(()=>{
        if(estadoHab===estados[0]) {
           setEnUsoHab(false);
           setUsoHab(true);
        } else if (estadoHab===estados[1]) {
            setEnUsoHab(true);
            setUsoHab(true);
        } else if (estadoHab===estados[2]){
            setEnUsoHab(false);
            setUsoHab(false);
        } else if (estadoHab===estados[3]){
            setEnUsoHab(true);
            setUsoHab(false);
        }
    },[estadoHab,estados])
    useEffect(()=>{
        const size=e.data()?.fichas.length;
        if (size>0){
            //console.log("here");
            const lastEl=e.data()?.fichas[size-1];
            //console.log('last Element',lastEl);
            const docRef = doc(firestore,'fichas',lastEl);
            let estado;
            getDoc(docRef).then((doc)=>{
                estado=doc.data()?.Activo;
                if (estado) {
                    setIdFicha(doc);
                    //console.log('docRef',docRef);
                }
                //console.log('estado',estado);
            });
        }
    },[e.data()?.fichas.length])
    const handleModificar = async () =>{
        if (!modificar){
            setModificar(!modificar);
        } else{
            await updateDoc(e.ref,{
                Numero_Habitacion: habitacion,
                tipo: tipo,
                precio: precio,
                estado: estadoHab,
            })
            setModificar(!modificar);
        }
    }
    //console.log("delArray",index,deleteArray);
    useEffect(()=>{
        if(typeof deleteArray === "object"){
        const newArray = [...deleteArray];
        //console.log("newArr",index,newArray);
        newArray[index] = estate;
        handleDelete([...newArray]);
        //console.log(index, deleteArray[index])
        }
    },[estate,deleteArray,handleDelete,index]);
    useEffect(()=>{
        setHabitacion(parseInt(e.data()?.Numero_Habitacion));
        setTipo(e.data()?.tipo);
        setPrecio(parseFloat(e.data()?.precio));
    },[modificar,e]);
    const handleColor = (
        estado
    ) => {
        let color;
        estados.forEach((ele, index) =>{
            //console.log("colores",estado);
            //console.log("estados",ele);
            if (estado === ele){
                color = colores[index];
            }
        }
        )
        return color;
    }
    const handleClose = () =>{
        setClientForm(false);
    }
    const handleLimpieza = async() =>{
        setEnUsoHab(!enUsoHab);
        setEstadoHab("Disponible");
        await updateDoc(e.ref,{
            estado: "Disponible",
        })
    }
    const handleCliente = async(id) =>{
        setUsoHab(!usoHab);
        setEstadoHab("Ocupado");
        await updateDoc(e.ref,{
            estado: "Ocupado",
            fichas: arrayUnion(id)
        })
    }
    const handleCheckout = async() =>{
        setUsoHab(!usoHab);
        setEnUsoHab(!enUsoHab);
        setEstadoHab("Limpieza");
        await updateDoc(e.ref,{
            estado: "Limpieza",
        })
        await updateDoc(idFicha.ref,{
            Activo: false,
        });
    }
    const handleFicha = () =>{
        setFicha(false);
    }
    return (
        <div>
            {
                !loadingDataUsr&&(!modificar?(
                    <div>
                    {e.data()?.Numero_Habitacion} 
                    {e.data()?.tipo} 
                    {e.data()?.precio}
                    <Circle color={handleColor(e.data()?.estado)}/>
                    {eliminar&&<ImageToggle handleState={setState} index={index}/>}
                    {dataUsr?.docs[0].data()?.rol==="administrador"&&<IconButton onClick={handleModificar}>
                        <DriveFileRenameOutlineIcon/>
                    </IconButton>}
                    {dataUsr?.docs[0].data()?.rol==="recepcionista"&&(usoHab?(
                        !enUsoHab?<IconButton onClick={()=>{setClientForm(true)}}>
                            <AddIcon/>
                        </IconButton>:<>
                        <IconButton onClick={()=>{setFicha(true)}}>
                            <FileOpenIcon/>
                        </IconButton>
                        <button onClick={handleCheckout}>
                            Habitacion liberada
                        </button>
                        </>):(!enUsoHab&&
                        <Button onClick={handleLimpieza}>Limpieza hecha</Button>)
                        )
                    }
                    </div>
                ):(
                    <div>
                        {habitacion}
                        <Dropdownlist updateData={setTipo} arrData={habitaciones}
                            defaultValue={tipo}/>
                        <input value={precio} type="number" onChange={(event)=>{
                            setPrecio(event.target.value);
                        }}/>
                        <Dropdownlist updateData={setEstadoHab} arrData={estados}
                            defaultValue={estadoHab}/>
                        <IconButton onClick={handleModificar}>
                            <DoneIcon/>
                        </IconButton>
                        <IconButton onClick={()=>{setModificar(!modificar)}}>
                            <CloseIcon/>
                        </IconButton>
                    </div>
                ))
            }
            {clientForm&&<HuespedForm show={clientForm} tipoHab={tipo} handleClose={handleClose}
             numHab={e.data()?.Numero_Habitacion} precio={e.data()?.precio} handleCliente={handleCliente}/>}
             {idFicha&&ficha&&<Ficha show={ficha} handleClose={handleFicha} idFicha={idFicha}/>}
        </div>
    )
}