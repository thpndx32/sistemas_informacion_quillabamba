import { Box, Button, FormControlLabel, Modal, Switch, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { FormProductoFicha } from "./FormProductoFicha";
import { firestore } from "../../config/firebase";
import { collection, doc, getDoc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { ShowFilasFicha } from "./ShowFilasFicha";
import { useDocument } from "react-firebase-hooks/firestore";
import { CompareDates } from "../../util/CompareDates";
import { ModificarEstadia } from "./ModificarEstadia";
import { BoxStyle } from "../../styles/Box";
import { FichaFechaStyle, FichaStyle, FichaTituloContenidoStyle, FichaTituloStyle, FilaFichaStyle } from "../../styles/FichaStyle";
export const Ficha = ({
    show, handleClose, idFicha, caja=false
}) => {
    console.log("id ficha", idFicha);
    const cajaId = sessionStorage.getItem('cajaRef');
    const [data, loadingData] = useDocument(idFicha.ref);
    const [formProductos, setFormProductos] = useState(false);
    const [payment, setPayment] = useState(false);
    const [arrPay, setArrPay] = useState([]);
    const handleAuxArray = (auxArr) =>{
        console.log("here", auxArr);
        setArrPay(auxArr);
        console.log("here", arrPay);
    }
    const handlePay = async() =>{
        const reciboRef = doc(collection(firestore,'recibos'));
        const object = {};
        console.log(arrPay);
        let total = 0;
        arrPay.forEach((e)=>{
            if(e[0]) {
                object[e[2][0]] = {
                Cantidad: e[2][1].Cantidad,
                Costo: e[2][1].Costo,
            };
            total += e[2][1].Costo;
            }
        })
        console.log("objeto",object);
        await setDoc(reciboRef,{
            Nombre: data.data().Huespedes[0].nombre,
            DNI: data.data().Huespedes[0].dni,
            Contenido: object,
            Total: total,
            Fecha: serverTimestamp(),
        })
        console.log(reciboRef.id);
        let Contenido1 = data.data().Contenido;
        console.log(Contenido1);
        let newArrPay= [];
        arrPay.forEach((e)=>{
            //const tempArr = Object.entries(data.data().Contenido)[e[1]];
            if(e[0]) {
                console.log(e);
                if(e[2][1].Recibo.length>0){
                    Contenido1[e[2][0]] = {
                        Cantidad: Contenido1[e[2][0]].Cantidad,
                        Costo: Contenido1[e[2][0]].Costo,
                        Recibo: [...Contenido1[e[2][0]].Recibo,reciboRef.id],
                        Pagados: Contenido1[e[2][0]].Pagados + (e[2][1].Cantidad),
                    }
                }else{
                    Contenido1[e[2][0]] = {
                        Cantidad: Contenido1[e[2][0]].Cantidad,
                        Costo: e[2][1].Costo,
                        Recibo: [reciboRef.id],
                        Pagados: e[2][1].Cantidad,
                    }
                }
            }else{
                newArrPay.push(e);
            }
        })
        console.log(newArrPay);
        setArrPay(newArrPay);
        console.log("Contenido",Contenido1);
        console.log(idFicha.ref);
        await updateDoc(idFicha.ref,{
            Contenido: Contenido1,
        })
        const cajaRef = doc(firestore,'caja',cajaId);
        let fichas={};
        await getDoc(cajaRef).then((doc)=>{
            console.log("docData", doc.data())
            fichas = doc.data().fichas;
            total += doc.data().ingresos;
        })
        console.log("fichas",fichas);
        console.log(idFicha)
        if(fichas[idFicha.id]){
            fichas[idFicha.id] = [...fichas[idFicha.id],reciboRef.id];
        }else{
            fichas[idFicha.id] = [reciboRef.id];
        }
        await updateDoc(cajaRef,{
            fichas: fichas,
            ingresos: total,
        })
    }
    const handleCerrar =()=>{
        handleClose();
        setArrPay(arrPay.map((e)=>{return([false,e[1],e[2]])}));
    }
    return (<Modal 
        open={show}
        onClose={handleCerrar}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Box sx={BoxStyle}>
            <FichaStyle>
            <h3>
                Ficha
            </h3>
            <FichaTituloContenidoStyle>
                <FichaTituloStyle>
                Numero de Habitacion    
                </FichaTituloStyle>  
                <FichaTituloStyle clase="numeroHabitacion">
                {!loadingData&&data.data().Numero_Habitacion}
                </FichaTituloStyle>
            </FichaTituloContenidoStyle>
            <div>
                <FichaTituloStyle>
                    Huespedes
                </FichaTituloStyle>
            {!loadingData&&data.data().Huespedes.map((row,index)=>{
                return (
                <FilaFichaStyle key={index}>
                    <div>
                        {row?.nombre}
                    </div>
                    <div>
                        {row?.telefono}
                    </div>
                    <div>
                        {row?.dni}
                    </div>
                </FilaFichaStyle>
                )
            })}   
            </div>
            <FichaFechaStyle>
                <div>
                    <FichaTituloStyle>Fecha Entrada</FichaTituloStyle>
                    <FilaFichaStyle clase="Fecha">
                    {!loadingData&&data.data().Inicio_Estadia.toDate().toDateString()}
                    </FilaFichaStyle>
                </div>
                <div>
                    <FichaTituloStyle>Fecha Salida</FichaTituloStyle>
                    <FilaFichaStyle clase="Fecha">
                    {!loadingData&&data.data().Final_Estadia[data.data().Final_Estadia.length-1].toDate().toDateString()}
                    </FilaFichaStyle>
                </div>
            </FichaFechaStyle>
            {!loadingData&&(caja?(
                data.data().Activo?
                <div>
                    <FormControlLabel 
                    control={<Switch value={payment} 
                    checked={payment} onChange={()=>{setPayment(!payment)}}
                    />} label="Pagado/Por pagar" />
                    <FichaTituloStyle>
                    {payment?"Productos/servicios pagados":"Productos/servicios por pagar"}
                    </FichaTituloStyle>
                    {<ShowFilasFicha payment={payment} productos={data.data().Contenido} loadingProductos={loadingData} caja={caja}/>}
                </div>:
                <div>
                    <FichaTituloStyle>
                    {"Productos/servicios Facturados"}
                    </FichaTituloStyle>
                    {<ShowFilasFicha payment={!payment} productos={data.data().Contenido} loadingProductos={loadingData} caja={caja}/>}
                </div>
                )
            :
                <>
                    <div>
                        <FormControlLabel 
                        control={<Switch value={payment} 
                        checked={payment} onChange={()=>{setPayment(!payment)}}
                        />} label="Pagado/Por pagar" />
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                        {payment?"Productos/servicios pagados":"Productos/servicios por pagar"}
                        </Typography>
                        {<ShowFilasFicha payment={payment} productos={data.data().Contenido} setArrPay={handleAuxArray} arrPay={arrPay} loadingProductos={loadingData}/>}
                    </div>
                    {data.data().Activo&&<Button onClick={()=>{setFormProductos(true)}}>
                        Añadir productos
                    </Button>}
                    {!payment&&<Button onClick={handlePay} disabled={false}>
                        Pagar 
                    </Button>}
                    {formProductos&&<FormProductoFicha ficha={data} show={formProductos} 
                    handleClose={()=>{setFormProductos(false)}}/>}
                </>
                )
            }
            </FichaStyle>
        </Box>
    </Modal>);
}