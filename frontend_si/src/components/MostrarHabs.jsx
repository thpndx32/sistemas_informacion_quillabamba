import { collection, query, where } from "firebase/firestore";
import { firestore } from "../config/firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { ImageToggle } from "./Administrador/Habitacion/ImageToggle";
import { useContext, useEffect, useState } from "react";
import { HabitacionFila } from "./HabitacionFila";
import { AuthContext } from "../views/AppQuillabamba";

export const MostrarHabs = (
    {q, eliminar, deleteToggle, setDeleteToggle, habitaciones}
) => {
    const [data, loadingData, errData] = useCollection(q);
    const estados = ["Disponible","Ocupado","Limpieza","No disponible"];
    const [usr, dataUsr, loadingDataUsr] = useContext(AuthContext)
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
                {!loadingDataUsr&&!loadingData&&(deleteToggle?.length>0||!deleteToggle)&&(
                    data.docs.sort(
                        (a, b) => a.data().Numero_Habitacion.localeCompare(b.data().Numero_Habitacion)
                        ).map((e,index)=>{
                        //console.log("e id",e.ref);
                        if(dataUsr?.docs[0].data()?.rol==="administrador") return <HabitacionFila loadingData={loadingData}  key={e.id} e={e} index={index}
                         handleDelete={setDeleteToggle} deleteArray={deleteToggle}
                          eliminar={eliminar} habitaciones={habitaciones} estados={estados}/>
                        else if (dataUsr?.docs[0].data()?.rol==="recepcionista" && e.data().estado != "No disponible") return <HabitacionFila loadingData={loadingData}  key={e.id} e={e} index={index}
                        handleDelete={setDeleteToggle} deleteArray={deleteToggle}
                         eliminar={eliminar} habitaciones={habitaciones} estados={estados}/>
                    })
                    )
                }
            </ul>
        </div>
    )
}