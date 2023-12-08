import { Box, FormControlLabel, Modal, Switch } from "@mui/material"
import { doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { firestore } from "../../../config/firebase";
import { ProductoCaja } from "../../Recepcionista/Caja/ProductoCaja";
import { FichaCaja } from "../../Recepcionista/Caja/FichaCaja";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

export const FormDetallesIngresos = ({
    show,handleClose,caja
}) =>{
    useEffect(()=>{
        console.log('caja ref',caja);
    },[])
    const [toSee, setToSee] = useState(false);
    return(
        <Modal
        open={show}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <FormControlLabel
                control={<Switch
                    checked={toSee}
                    onChange={()=>{setToSee(!toSee)}}
                />} label={toSee?"Fichas":"Productos Individuales"}
                />
                {!toSee?
                caja?.data()?.productos?.map((producto,index)=>{
                    return <ProductoCaja key={index} producto={producto}/>
                })
                :Object.entries(caja?.data()?.fichas)?.map((ficha,index)=>{
                    return <FichaCaja key={index} ficha={ficha}/>
                })}
            </Box>
        </Modal>
    )
}