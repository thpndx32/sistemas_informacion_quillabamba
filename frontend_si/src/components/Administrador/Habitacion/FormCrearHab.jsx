import { Box, Button, Modal, Typography } from "@mui/material"
import { addDoc, collection, query, where } from "firebase/firestore";
import { firestore } from "../../../config/firebase";
import { useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { Dropdownlist } from "../../Dropdownlist";
import { BoxStyle } from "../../../styles/Box";

export const FormCrearHab= (
    {show,handleClose,habitaciones}
) => { 
    const [numHab, setNumHab] = useState("");
    const [tipo, setTipo] = useState("");
    const [precio, setPrecio] = useState(0);
    const q = query(collection(firestore,"habitaciones"),where("Numero_Habitacion","==",numHab));
    const [data, loadingData, errData] = useCollection(q);
    const [actividad, setActividad] = useState(false);
    const [errActividad, setErrActividad] = useState(false);
    const [error, setError] = useState(false);
    
    const createHab = async() =>{
        console.log("data",data.docs);
        if(data.docs.length===0){
            const docuRef = await addDoc(collection(firestore, `habitaciones`),{
                Numero_Habitacion: numHab,
                tipo: tipo,
                precio: precio,
                estado: "Disponible",
                activa: true,
                fichas: [],
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
            const docuRef = await addDoc(collection(firestore, `habitaciones`),{
                Numero_Habitacion: numHab,
                tipo: tipo,
                precio: precio,
                estado: "Disponible",
                activa: true,
                fichas: [],
            });
            console.log("documento", docuRef.id);
            setErrActividad(false);
            handleClose();
        }
    }
    const handleVerification = () =>{
        if(numHab.length<3||tipo===""||!precio){
            setError(true);
            console.log("here");
            return true;
        }else{
            setError(false);
            console.log("false");
            return false;
        }
    }
    
    const handleInputNumHabitacion = (e) =>{
        const value = e.target.value;
        if (/^\d{0,3}$/.test(value)) {
            setNumHab(parseInt(value));
          }
    }
    const handleInputPrecio = (e) =>{
        const value = e.target.value;
        if (/^\d*(\.\d{0,2})?$/.test(value)) {
            setPrecio(parseFloat(value));
          }
    }


    return (
        <Modal 
            open={show}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={BoxStyle}>
                <Typography id="modal-modal-title" variant="h6" component="h2" sx={
                    {textTransform : "uppercase"}
                }>
                Registro de habitacion
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Llene los siguientes datos para registrar una habitacion.
                </Typography>
                <div>
                <input placeholder="numero habitacion" type="text" value={numHab} onChange={handleInputNumHabitacion}></input>
                {error&&<p>debe tener tres digitos</p>}
                </div>
                <div>
                    <Dropdownlist updateData={setTipo} arrData={habitaciones}></Dropdownlist>
                    {error&&<p>debes de escoger una alternativa</p>}
                </div>
                <div>
                    <input placeholder="precio" type="number" value={precio} onChange={handleInputPrecio}></input>
                    {error&&<p>debes usar un valor mayor a S/.0.00</p>}
                </div>
                <Button onClick={()=>{
                    if(!handleVerification()) createHab();
                    }}>
                    registrar habitacion
                </Button>
                {errActividad&&<p> El numero de habitacion ya esta en uso</p>}
            </Box>
        </Modal>
    )
}