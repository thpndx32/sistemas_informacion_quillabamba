import { Box, Button, Modal, Typography } from "@mui/material"
import { SearchBox } from "../SearchBox";
import { useState } from "react";
import { Pedidos } from "./Pedidos";
import { BoxStyle } from "../../styles/Box";

export const FormProductoInd = (
    {show,handleClose}
) => {
    
    const [orders, setOrders] = useState([]);
    const [nombre, setNombre] = useState('');
    const [dni, setDNI] = useState('');
    
    const eliminarElemento = (indexElim) => {
        const arr = orders.filter((_,index)=>index !== indexElim);
        console.log(indexElim);
        console.log(arr);
        if(indexElim>-1){
            setOrders([...arr]);
        }
    };
    return (
        <Modal
            open={show}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={BoxStyle}>
                <div>
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={
                        {textTransform : "uppercase"}
                    }>
                    Datos Cliente
                    </Typography>    
                    <input type={'text'} placeholder="Nombre" value={nombre} onChange={(e)=>{setNombre(e.target.value)}}/>
                    <input type={'text'} placeholder="DNI" value={dni} onChange={(e)=>{setDNI(e.target.value)}}/>
                </div>
                <Typography id="modal-modal-title" variant="h6" component="h2" sx={
                    {textTransform : "uppercase"}
                }>
                Items disponibles a la venta
                </Typography>                
                <SearchBox Collection={"inventario"} atributo={"Nombre"} handleOrders={setOrders} Orders={orders}/>
                <Pedidos orders={orders} eliminarElemento={eliminarElemento} handleClose={handleClose} nombre={nombre} DNI={dni}/>
            </Box>
        </Modal>
    )
}