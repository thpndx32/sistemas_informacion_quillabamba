import { Box, Modal, Typography } from "@mui/material"
import { SearchBox } from "../SearchBox";
import { useState } from "react";
import { BoxStyle } from "../../styles/Box";

export const FormProductoFicha = (
    {show,handleClose, ficha}
) => {
    console.log("her");
    const [orders, setOrders] = useState([]);
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
                Items disponibles a la venta
                </Typography>                
                <SearchBox Collection={"inventario"} atributo={"Nombre"} handleOrders={setOrders} 
                Orders={orders} ficha={ficha}/>
            </Box>
        </Modal>
    )
}