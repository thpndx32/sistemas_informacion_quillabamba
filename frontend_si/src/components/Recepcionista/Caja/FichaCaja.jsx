import { useDocument } from "react-firebase-hooks/firestore"
import { firestore } from "../../../config/firebase"
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";

export const FichaCaja = ({
    ficha
}) =>{
    const [data, loadingData]=useDocument(doc(firestore,'fichas',ficha[0]));
    const [showRecibos, setShowRecibos] = useState(false);
    const [total, setTotal] = useState(0);
    const [recibos, setRecibos] = useState([]);
    const recibosP = ficha[1].map(async(recibo)=>{
        let arrNombres;
        let TotalLocal;
        await getDoc(doc(firestore,'recibos',recibo)).then((doc)=>{
            arrNombres = Object.entries(doc.data().Contenido).map((e)=>{
                return (e[0]);
            })
            TotalLocal = doc.data().Total;
        })
        return ([recibo, arrNombres, TotalLocal]);
    })
    useEffect(()=>{
        let tempRecibos = [];
        let totalLocal = 0;
        recibosP.forEach((recibo,index)=>{
            if(recibos.length < recibosP.length&&JSON.stringify(recibos[recibos.length-1])!==JSON.stringify(recibosP[recibosP.length-1]))
                recibo.then((reciboCompleto)=>{
                    console.log("recibo Completo",reciboCompleto);
                    tempRecibos.push(reciboCompleto);
                    totalLocal += reciboCompleto[2];
                    if(index===recibosP.length-1){
                        setRecibos(tempRecibos);
                        setTotal(totalLocal);
                    }
                }
            )
            console.log("index",index);
        })

        console.log(recibos);
    },[])
    useEffect(()=>{
        console.log("recibos",recibos);
    },[recibos])
    return(
        <div>
            {!loadingData&&<div onClick={()=>setShowRecibos(!showRecibos)}>
                {data.data().Numero_Habitacion}   
                {total} 
            </div>}
            {showRecibos&&recibos.map((recibo,index)=>{
                console.log(recibo);
                return (
                    <div key={index}>
                        {recibo[0]}
                        {recibo[1].map((nombre)=>{
                            return(
                                <>
                                    {nombre}
                                </>
                            )
                        })}
                        {recibo[2]}
                    </div>
                )
            })}
        </div>
    )
}