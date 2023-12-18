import { Box, Button, Modal, Typography } from "@mui/material"
import { addDoc, collection, doc, query, setDoc, where } from "firebase/firestore";
import { firestore } from "../../../config/firebase";
import { useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { Dropdownlist } from "../../Dropdownlist";
import { BoxStyle } from "../../../styles/Box";
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
        const arrayPalabras = nombre.split(" ");
        let document = {
            Nombre: nombre,
            Cantidad: cantidad,
            Comerciabilidad: comerciabilidad,
            activa: true,
        };
        for (let i=1; i<=arrayPalabras.length-1; i++){
            document={...document, [`Nombre${i}`]:arrayPalabras[i]};
        }
        if(data.docs.length===0||
            data.docs.map((e)=>{
                let same = true;
                same = same || nombre === e.data().Nombre;
                return (same);
            }).every(element => element===false)){
            const docRef = doc(collection(firestore,path));
            if(comerciabilidad){
                document={...document, Precio:precio}
                await setDoc(docRef,document);
            }
            else{
                document={...document, Precio:0}
                await setDoc(docRef,document);
            }
            console.log("documento", docRef.id);
            setErrActividad(false);
            handleClose();
        } else{
            setErrActividad(true);
            console.log("no realizado");
        }
    }
    const close = () =>{
        setNombre("");
        setCantidad();
        setComerciabilidad(true);
        setPrecio();
        handleClose();
    }
    return (
        <Modal 
            open={show}
            onClose={close}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={BoxStyle}>
                <Typography id="modal-modal-title" variant="h6" component="h2" sx={
                    {textTransform : "uppercase"}
                }>
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