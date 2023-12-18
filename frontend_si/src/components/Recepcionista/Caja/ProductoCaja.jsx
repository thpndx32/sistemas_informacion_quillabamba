import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestore } from "../../../config/firebase";
import {  useDocumentOnce } from "react-firebase-hooks/firestore";
import { ElementoListadoBarraStyle } from "../../../styles/Listado";

export const ProductoCaja = ({
    producto
}) =>{
    const [data, loadingData] = useDocumentOnce(doc(firestore,'recibos',producto));
    return(
        <ElementoListadoBarraStyle>
            <div>{producto}</div>
            <div>
            {!loadingData&&Object.entries(data.data().Contenido).map((Item,index)=>{
                return (
                    <div key={index}>
                        {Item[0]}
                    </div>
                )
            })}
            </div>
            <div>{!loadingData&&data.data().Total}</div>
        </ElementoListadoBarraStyle>
    )
}