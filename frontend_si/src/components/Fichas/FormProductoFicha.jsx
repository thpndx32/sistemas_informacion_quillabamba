import { Box, Modal, Typography } from "@mui/material"
import { SearchBox } from "../SearchBox";
import { useState } from "react";

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

export const FormProductoFicha = (
    {show,handleClose, ficha}
) => {
    
    const [orders, setOrders] = useState([]);
    return (
        <Modal
            open={show}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                Items disponibles a la venta
                </Typography>                
                <SearchBox Collection={"inventario"} atributo={"Nombre"} handleOrders={setOrders} 
                Orders={orders} ficha={ficha}/>
            </Box>
        </Modal>
    )
}