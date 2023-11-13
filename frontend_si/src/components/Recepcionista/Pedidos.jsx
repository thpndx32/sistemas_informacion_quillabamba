import { useEffect, useState } from "react";
import { FilaPedido } from "./FilaPedido";
import { Button } from "@mui/material";
import { collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { firestore } from "../../config/firebase";

export const Pedidos = ({
    orders, eliminarElemento, handleClose, nombre, DNI
}) =>{
    const [total, setTotal] = useState(0);
    useEffect(()=>{
        let totalLocal=0;
        orders.forEach(element => {
            totalLocal += element[1]*element[0].data()?.Precio;
        });
        setTotal(totalLocal);

    },[orders])
    const formatoMoneda = new Intl.NumberFormat('es-PE', {
        style: 'currency',
        currency: 'PEN', // Código de moneda ISO 4217 para soles peruanos
        minimumFractionDigits: 2,
      });

      const handlePagar = async() =>{
        orders.forEach(async(order) =>{
            await updateDoc(order[0].ref,{
                Cantidad: order[0].data().Cantidad-order[1]
            })
        });
        const reciboRef = doc(collection(firestore,'recibos'));
        const mapa= new Map();
        orders.forEach(order => {
            mapa.set(order[0].data().Nombre, {Cantidad: order[1], Costo: order[1]*order[0].data().Precio});
          });
        const myObject = {};
        mapa.forEach((value, key) => {
        myObject[key] = value;
        });
        await setDoc(reciboRef,{
            Nombre: nombre,
            DNI: DNI,
            Contenido: myObject,
            Total: total,
        })
        handleClose();
      }
    return (<div>
        <h3>Pedidos</h3>
        {orders.map((order,index)=>{
            return(
                <FilaPedido key={index} order={order} index={index} elim={eliminarElemento}/>
                
            )
        })}
        <div>
            <h3>Precio Total</h3>
            {formatoMoneda.format(total)}
            <Button disabled={orders.length === 0} onClick={handlePagar}> Pagar </Button>
        </div>
    </div>)
}