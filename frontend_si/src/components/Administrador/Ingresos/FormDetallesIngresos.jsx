import { Box, FormControlLabel, Modal, Switch } from "@mui/material"
import { doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { firestore } from "../../../config/firebase";
import { ProductoCaja } from "../../Recepcionista/Caja/ProductoCaja";
import { FichaCaja } from "../../Recepcionista/Caja/FichaCaja";
import { BoxStyle } from "../../../styles/Box";
import { ElementoListadoBarraStyle, ListadoBarraStyle } from "../../../styles/Listado";

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
            <Box sx={BoxStyle}>
                <FormControlLabel
                control={<Switch
                    checked={toSee}
                    onChange={()=>{setToSee(!toSee)}}
                />} label={toSee?"Fichas":"Productos Individuales"}
                />
                {!toSee?<div>
                    <ElementoListadoBarraStyle clase="RecibosHeader" fontSize="20">
                        <div>
                            Id Recibo
                        </div>
                        <div>
                            Items
                        </div>
                        <div>
                            Costo
                        </div>
                    </ElementoListadoBarraStyle>
                    <ListadoBarraStyle>  
                    {caja?.data()?.productos?.map((producto,index)=>{
                        return <ProductoCaja key={index} producto={producto}/>
                    })}
                    </ListadoBarraStyle>
                    </div>
                :<div>
                    <ElementoListadoBarraStyle clase="Header">
                        <div>
                            Numero Habitacion
                        </div>
                        <div>
                            Ingresos totales
                        </div>
                        <div>
                            Mostrar ficha
                        </div>
                        <div>
                            Mostrar recibos
                        </div>
                    </ElementoListadoBarraStyle>
                    <ListadoBarraStyle>{
                        Object.entries(caja?.data()?.fichas)?.map((ficha,index)=>{
                            return <FichaCaja key={index} ficha={ficha}/>
                        })    
                    }</ListadoBarraStyle>
                </div>
                }
            </Box>
        </Modal>
    )
}