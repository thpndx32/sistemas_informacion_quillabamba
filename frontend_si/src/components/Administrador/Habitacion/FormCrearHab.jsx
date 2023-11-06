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

export const FormCrearHab= (
    {show,handleClose,habitaciones}
) => { 
    const [numHab, setNumHab] = useState("");
    const [tipo, setTipo] = useState("");
    const [precio, setPrecio] = useState();
    const q = query(collection(firestore,"habitaciones"),where("Numero_Habitacion","==",numHab));
    const [data, loadingData, errData] = useCollection(q);
    const [actividad, setActividad] = useState(false);
    const [errActividad, setErrActividad] = useState(false);
    
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

    return (
        <Modal 
            open={show}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                Registro de habitacion
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Llene los siguientes datos para registrar una habitacion.
                </Typography>
                <input placeholder="numero habitacion" type="text" onChange={(e)=>setNumHab(e.target.value)}></input>
                <Dropdownlist updateData={setTipo} arrData={habitaciones}></Dropdownlist>
                <input placeholder="precio" type="number" onChange={(e)=>setPrecio(parseFloat(e.target.value))}></input>
                <Button onClick={createHab}>
                    registrar habitacion
                </Button>
                {errActividad&&<p> El numero de habitacion ya esta en uso</p>}
            </Box>
        </Modal>
    )
}