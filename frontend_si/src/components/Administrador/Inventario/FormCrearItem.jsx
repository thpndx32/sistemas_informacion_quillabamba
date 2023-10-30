import { Box, Button, Modal, Typography } from "@mui/material"
import { addDoc, collection, query, where } from "firebase/firestore";
import { firestore } from "../../../config/firebase";
import { useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { Dropdownlist } from "../../Dropdownlist";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

export const FormCrearItem= (
    {show,handleClose,dataArray,path}
) => { 
    const [nombre, setNombre] = useState("");
    const [cantidad, setCantidad] = useState();
    const [comerciabilidad, setComerciabilidad] = useState(true);
    const [precio, setPrecio] = useState();
    const q = query(collection(firestore,path),where("Nombre","==",nombre));
    const [data, loadingData, errData] = useCollection(q);
    const [actividad, setActividad] = useState(false);
    const [errActividad, setErrActividad] = useState(false);
    
    const handleComerciabilidad = (
        e
    )=>{
        if (e===dataArray[0]){
            setComerciabilidad(true);
        } else if (e===dataArray[1]){
            setComerciabilidad(false);
        }
    }
    const createItem = async() =>{
        console.log("data",data.docs);
        if(data.docs.length===0){
            const docuRef = await addDoc(collection(firestore, path),{
                Nombre: nombre,
                Cantidad: cantidad,
                Estado: comerciabilidad,
                Precio: precio,
                activa: true,
            });
            console.log("documento", docuRef.id);
            setErrActividad(false);
            handleClose();
        } else{
            for (const e of data.docs){
                console.log(e.data());
                if(e.data()?.activa){
                    setActividad(true);
                    setErrActividad(true);
                    console.log("no realizado");
                    return;
                } 
            }
            if(actividad){
                setActividad(false);
                return;
            }
            const docuRef = await addDoc(collection(firestore, path),{
                Nombre: nombre,
                Cantidad: cantidad,
                Estado: comerciabilidad,
                Precio: precio,
                activa: true,
            });
            console.log("documento", docuRef.id);
            setErrActividad(false);
            handleClose();
        }
    }

    return (
        <Modal 
            open={show}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                Registro de item
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Llene los siguientes datos para registrar un item.
                </Typography>
                <input placeholder="nombre item" type="text" onChange={(e)=>setNombre(e.target.value)}></input>
                <input placeholder="cantidad" type="number" onChange={(e)=>setCantidad(parseInt(e.target.value))}></input>
                <input placeholder="precio" type="number" onChange={(e)=>setPrecio(parseFloat(e.target.value))}></input>
                <Dropdownlist updateData={handleComerciabilidad} arrData={dataArray}/>
                <Button onClick={createItem}>
                    Registrar item
                </Button>
                {errActividad&&<p> El nombre de item ya esta en uso</p>}
            </Box>
        </Modal>
    )
}