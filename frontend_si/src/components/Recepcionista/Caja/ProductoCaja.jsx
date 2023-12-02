import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestore } from "../../../config/firebase";
import {  useDocumentOnce } from "react-firebase-hooks/firestore";

export const ProductoCaja = ({
    producto
}) =>{
    const [data, loadingData] = useDocumentOnce(doc(firestore,'recibos',producto));
    return(
        <div>
            {producto}
            {!loadingData&&Object.entries(data.data().Contenido).map((Item)=>{
                return (
                    <>
                        {Item[0]}
                    </>
                )
            })}
            {!loadingData&&data.data().Total}
        </div>
    )
}