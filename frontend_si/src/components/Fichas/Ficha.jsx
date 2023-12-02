import { Box, Button, FormControlLabel, Modal, Switch, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { FormProductoFicha } from "./FormProductoFicha";
import { firestore } from "../../config/firebase";
import { collection, doc, getDoc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { ShowFilasFicha } from "./ShowFilasFicha";
import { useDocument } from "react-firebase-hooks/firestore";

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
    const cajaId = sessionStorage.getItem('cajaRef');
    const [data, loadingData] = useDocument(idFicha.ref);
    const [formProductos, setFormProductos] = useState(false);
    const [payment, setPayment] = useState(false);
    const [arrPay, setArrPay] = useState([]);
    /*const [productosPagados, setProductosPagados] = useState([]);
    const [productosNoPagados, setProductosNoPagados] = useState([]);
    useEffect(()=>{
        if(!loadingData){
        console.log("Productos",data.data().Contenido);
        let pagados=[], noPagados =[];
        Object.entries(data.data().Contenido).forEach((e)=>{
            if(e[1].Recibo==='') noPagados.push(e);
            else pagados.push(e);
        })
        console.log("Productos pagados",pagados);
        console.log("Productos noPagados",noPagados);
        setProductosPagados(pagados);
        setProductosNoPagados(noPagados);}
    },[data?.data().Contenido.length])*/
    const handleAuxArray = (auxArr) =>{
        setArrPay(auxArr);
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
        arrPay.forEach((e)=>{
            //const tempArr = Object.entries(data.data().Contenido)[e[1]];
            if(e[0]) {
                if(Contenido1[e[2][0]]){
                    Contenido1[e[2][0]] = {
                        Cantidad: Contenido1[e[2][0]].Cantidad+e[2][1].Cantidad,
                        Costo: Contenido1[e[2][0]].Costo + e[2][1].Costo,
                        Recibo: [...Contenido1[e[2][0]].Recibo,reciboRef.id],
                    }
                }else{
                    Contenido1[e[2][0]] = {
                        Cantidad: e[2][1].Cantidad,
                        Costo: e[2][1].Costo,
                        Recibo: [reciboRef.id],
                    }
                }
            }
        })
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
        <Box sx={style}>
            <h3>
                Ficha
            </h3>
            {!loadingData&&data.data().Huespedes.map((row,index)=>{
                return (
                <div key={index}>
                    {row?.nombre}
                    {row?.telefono}
                    {row?.dni}
                </div>
                )
            })}
            <div>
            {!loadingData&&data.data().Numero_Habitacion}
            </div>
            <div>
            {!loadingData&&data.data().Inicio_Estadia.toDate().toDateString()}
            {!loadingData&&data.data().Final_Estadia[data.data().Final_Estadia.length-1].toDate().toDateString()}
            </div>
            <FormControlLabel 
                control={<Switch value={payment} 
                checked={payment} onChange={()=>{setPayment(!payment)}}
                />} label="Pagado/Por pagar" />
            <Typography id="modal-modal-title" variant="h6" component="h2">
            {payment?"Productos/servicios pagados":"Productos/servicios por pagar"}
            </Typography>
            {!loadingData&&<ShowFilasFicha payment={payment} productos={data.data().Contenido} setArrPay={handleAuxArray} arrPay={arrPay} loadingProductos={loadingData}/>}
            {!loadingData&&data.data().Activo&&<Button onClick={()=>{setFormProductos(true)}}>
                Añadir productos
            </Button>}
            {!loadingData&&data.data().Activo&&<Button>
                Modificar estadia
            </Button>}
            {!payment&&<Button onClick={handlePay}>
                Pagar 
            </Button>}
            {formProductos&&<FormProductoFicha ficha={data} show={formProductos} 
            handleClose={()=>{setFormProductos(false)}}/>}
        </Box>
    </Modal>);
}