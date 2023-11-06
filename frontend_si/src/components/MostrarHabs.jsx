import { collection, query, where } from "firebase/firestore";
import { firestore } from "../config/firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { ImageToggle } from "./Administrador/Habitacion/ImageToggle";
import { useEffect, useState } from "react";
import { HabitacionFila } from "./HabitacionFila";

export const MostrarHabs = (
    {q, eliminar, deleteToggle, setDeleteToggle, habitaciones}
) => {
    const [data, loadingData, errData] = useCollection(q);
    const estados = ["Disponible","Ocupado","Limpieza","No disponible"];
    useEffect(()=>{
        if (!loadingData && data?.docs.length > 0&& typeof setDeleteToggle === "function") {
            const falseArray = new Array(data?.docs.length).fill(false);
            //console.log("False ",falseArray);
            setDeleteToggle(falseArray);
        }
    },[loadingData,eliminar,deleteToggle?.length,data])
    /*useEffect(()=>{
        console.log("data_habs",data?.docs);
    },[data])*/
    return (
        <div>
            <ul>
                {!loadingData&&(deleteToggle?.length>0||!deleteToggle)&&(
                    data.docs.map((e,index)=>{
                        //console.log("e id",e.ref);
                        return <HabitacionFila loadingData={loadingData}  key={e.id} e={e} index={index}
                         handleDelete={setDeleteToggle} deleteArray={deleteToggle}
                          eliminar={eliminar} habitaciones={habitaciones} estados={estados}/>
                    })
                    )
                }
            </ul>
        </div>
    )
}