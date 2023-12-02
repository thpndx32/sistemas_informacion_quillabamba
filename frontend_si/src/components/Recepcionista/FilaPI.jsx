import { useEffect, useState } from "react"
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { IconButton } from "@mui/material";
import { updateDoc } from "firebase/firestore";
export const FilaPI = ({
    doc, ficha, addOrder, OrdersLength, Orders, checkOrder, cambio
})=>{
    const [cantidad,setCantidad] = useState(0);
    const [stockCantidad, setStockCantidad] = useState(doc.data()?.Cantidad);
    const [indexOrder, setIndexOrder] = useState(-1);
    const handleCantidad = (
        val
    ) => {
        if (val <= stockCantidad&& val>-1){
            setCantidad(val);
        }
    };
    for (let i = 0; i < Orders.length; i++) {
        if (doc.data().Nombre === Orders[i][0].data().Nombre&&indexOrder===-1){
            setStockCantidad(stockCantidad-Orders[i][1]);
            setIndexOrder(i);
            break;
        } 
    }
    useEffect(()=>{
        console.log("indexOrder",indexOrder);
    },[indexOrder])
    useEffect(()=>{
        if(!cambio){
            console.log("Orders Length");
            if(!checkOrder(doc, indexOrder)){
                if(!checkOrder(doc,indexOrder-1)){
                    console.log("Orders Length 1");
                    setStockCantidad(doc.data()?.Cantidad);
                    setIndexOrder(-1);
                } else {
                    console.log("Orders Length 2");
                    setIndexOrder(indexOrder-1);
                }
            }
        }
    },[OrdersLength,cambio,checkOrder,doc,indexOrder])
    const handlePedir = async () => {
        if(ficha){
            const object = ficha.data().Contenido;
            if(object[doc.data()?.Nombre]){
                object[doc.data()?.Nombre] = {
                    Cantidad: cantidad+object[doc.data()?.Nombre].Cantidad,
                    Costo: doc.data()?.Precio*cantidad+object[doc.data()?.Nombre].Costo,
                    Recibo: '',
                };
            }else{
                object[doc.data()?.Nombre] = {
                    Cantidad: cantidad,
                    Costo: doc.data()?.Precio*cantidad,
                    Recibo: '',
                };
            }
            await updateDoc(ficha.ref,{
                Contenido: object
            });
            await updateDoc(doc.ref,{
                Cantidad: stockCantidad
            });
            //console.log(stockCantidad-cantidad);
            setStockCantidad(stockCantidad-cantidad);
            setCantidad(0);
        }else{
            setIndexOrder(addOrder([doc, cantidad],indexOrder));
            setStockCantidad(stockCantidad-cantidad);
            setCantidad(0);
        }
    };
    return (
        <div>
            {doc.data()?.Nombre}
            {doc.data()?.Precio}
                Stock:
                {stockCantidad}
            <input type='number' value={cantidad} onChange={(e)=>{handleCantidad(parseInt(e.target.value))}} placeholder={doc.data()?.Cantidad}/>
            <IconButton onClick={()=>{handlePedir()}}>
                <AddShoppingCartIcon/>
            </IconButton>
        </div>
    )
}