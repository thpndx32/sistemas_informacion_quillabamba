import { useDocument } from "react-firebase-hooks/firestore"
import { firestore } from "../../../config/firebase"
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { IconButton } from "@mui/material";
import { Ficha } from "../../Fichas/Ficha";
import { ElementoListadoBarraStyle, ListadoBarraStyle } from "../../../styles/Listado";

export const FichaCaja = ({
    ficha
}) =>{
    const [data, loadingData]=useDocument(doc(firestore,'fichas',ficha[0]));
    const [showRecibos, setShowRecibos] = useState(false);
    const [total, setTotal] = useState(0);
    const [recibos, setRecibos] = useState([]);
    const [showFicha, setShowFicha] = useState(false);

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
                    //console.log("recibo Completo",reciboCompleto);
                    tempRecibos.push(reciboCompleto);
                    totalLocal += reciboCompleto[2];
                    if(index===recibosP.length-1){
                        setRecibos(tempRecibos);
                        setTotal(totalLocal);
                    }
                }
            )
            //console.log("index",index);
        })

        //console.log(recibos);
    },[])
    /*useEffect(()=>{
        console.log("recibos",recibos);
    },[recibos])*/
    return(
        <div>
            {!loadingData&&<div>
                <ElementoListadoBarraStyle clase="Fichas">
                    <div>
                        {data.data().Numero_Habitacion}   
                    </div>
                    <div>
                        {total} 
                    </div>
                    <div>
                    <IconButton onClick={()=>setShowFicha(true)}>
                        <InsertDriveFileIcon/>
                    </IconButton>
                    </div>
                    <button onClick={()=>setShowRecibos(!showRecibos)}>
                        Recibos
                    </button>
                </ElementoListadoBarraStyle>
            </div>}
            {showRecibos&&<ElementoListadoBarraStyle clase="RecibosHeader">
                <div>
                    Id Recibo
                </div>
                <div>
                    Items
                </div>
                <div>
                    Costo
                </div>
            </ElementoListadoBarraStyle>}
            <ListadoBarraStyle maxHeight="250">
            {showRecibos&&recibos.map((recibo,index)=>{
                //console.log(recibo);
                return (
                    <ElementoListadoBarraStyle key={index} clase="Recibos">
                        <div>{recibo[0]}</div>
                        <div>
                        {recibo[1].map((nombre,index)=>{
                            return(
                                <div key={index}>
                                    {nombre}
                                </div>
                            )
                        })}
                        </div>
                        <div>{recibo[2]}</div>
                    </ElementoListadoBarraStyle>
                )
            })}
            {showFicha&&<Ficha show={showFicha} handleClose={()=>setShowFicha(false)} idFicha={data} caja={true}/>}
        </ListadoBarraStyle>
        </div>
    )
}