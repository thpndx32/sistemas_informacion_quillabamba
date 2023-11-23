import { Box, Button, Modal, Typography } from "@mui/material";
import { useState } from "react";
import { FormProductoFicha } from "../Recepcionista/FormProductoFicha";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

export const Ficha = ({
    show, handleClose, idFicha
}) => {
    //console.log("id ficha", idFicha);
    const [formProductos, setFormProductos] = useState(false);
    const arrHuespedes = idFicha.data()?.Huespedes;
    return (<Modal 
        open={show}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Box sx={style}>
            <h3>
                Ficha
            </h3>
            {idFicha.data().Huespedes.map((row,index)=>{
                return (
                <div key={index}>
                    {row?.nombre}
                    {row?.telefono}
                    {row?.dni}
                </div>
                )
            })}
            <div>
            {idFicha.data().Numero_Habitacion}
            </div>
            <div>
            {idFicha.data().Inicio_Estadia.toDate().toDateString()}
            {idFicha.data().Final_Estadia[idFicha.data().Final_Estadia.length-1].toDate().toDateString()}
            </div>
            <Typography id="modal-modal-title" variant="h6" component="h2">
            Lista de compras
            </Typography>
            {idFicha.data().Activo&&<Button onClick={()=>{setFormProductos(true)}}>
                Añadir productos
            </Button>}
            {idFicha.data().Activo&&<Button>
                Modificar estadia
            </Button>}
            {formProductos&&<FormProductoFicha ficha={idFicha} show={formProductos} 
            handleClose={()=>{setFormProductos(false)}}/>}
        </Box>
    </Modal>);
}