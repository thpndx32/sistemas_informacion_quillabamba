import { Box, Button, Modal, Typography } from "@mui/material"
import { SearchBox } from "../SearchBox";
import { useState } from "react";
import { Pedidos } from "./Pedidos";

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
            <Box sx={style}>
                <div>
                    <h3>Datos Cliente</h3>
                    <input type={'text'} placeholder="Nombre" value={nombre} onChange={(e)=>{setNombre(e.target.value)}}/>
                    <input type={'text'} placeholder="DNI" value={dni} onChange={(e)=>{setDNI(e.target.value)}}/>
                </div>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                Items disponibles a la venta
                </Typography>                
                <SearchBox Collection={"inventario"} atributo={"Nombre"} handleOrders={setOrders} Orders={orders}/>
                <Pedidos orders={orders} eliminarElemento={eliminarElemento} handleClose={handleClose} nombre={nombre} DNI={dni}/>
            </Box>
        </Modal>
    )
}