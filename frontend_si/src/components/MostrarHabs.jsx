import { collection, onSnapshot, query, where } from "firebase/firestore";
import { firestore } from "../config/firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { ImageToggle } from "./Administrador/Habitacion/ImageToggle";
import { useContext, useEffect, useState } from "react";
import { HabitacionFila } from "./HabitacionFila";
import { AuthContext } from "../views/AppQuillabamba";
import { TrackQuery } from "./TrackQuery";
import { Await } from "react-router-dom";
import { Intersection } from "../util/Intersection";
import { ElementoLista } from "../styles/Listado";
export const estadosHabitaciones = ["Disponible","Ocupado","Limpieza","No disponible"];

const useControlQueries = (q, initialQuery) =>{
    const [arrQueries, setArrQueries] = useState([]);
    //console.log("Mostrar q", q);
    //console.log("enters the control queries");
    //console.log("arrQueries before",arrQueries);
    const [loading, setLoading] = useState(false);
    const [lastQuery, setLastQuery] = useState(true);
    const [interseccion, setInterseccion] = useState([]);
    useEffect(()=>{
        setLoading(true);
        //console.log("enters here");
        q.forEach((quer,index)=>{
            console.log("quer",quer);
            const unsubscribe = onSnapshot(quer,(snapshot)=>{
                let copyQueries;
                if(initialQuery){
                    copyQueries = [];
                } else{
                    if (lastQuery===true){
                        copyQueries = [];
                    } else{
                        //console.log("arrQueries", arrQueries);
                        if (arrQueries.length>=q.length){
                            copyQueries = [];
                        } else copyQueries = arrQueries;
                    }
                }
                if(index>=copyQueries.length){
                    copyQueries.push(snapshot.docs);
                    //console.log("copyQueries",copyQueries);
                }
                console.log(`snapshot ${index}`, snapshot.docs);
                setLastQuery(initialQuery);
                setArrQueries([...copyQueries]);
            })
        }
        )
        setLoading(false);
    },[q,initialQuery])
    useEffect(()=>{
        //console.log("arrQueries", arrQueries);
        const intersecta = Intersection(arrQueries);
        //console.log("arrQueries", arrQueries.length);
        //console.log("intersecta", intersecta);
        if(interseccion!==intersecta) setInterseccion(intersecta);
    },[arrQueries[0],loading,arrQueries.length,lastQuery])
    //console.log("queries",q);
    return [interseccion, loading];
}

export const MostrarHabs = (
    {q, eliminar, deleteToggle, setDeleteToggle, habitaciones, initialQuery}
) => {
    const [data, loadingData] = useControlQueries(q, initialQuery);
    //console.log("Mostrar data", data);
    //console.log("Mostrar data", data?.length);
    const [usr, dataUsr, loadingDataUsr] = useContext(AuthContext);
    useEffect(()=>{
        if (!loadingData && data?.length > 0&& typeof setDeleteToggle === "function") {
            const falseArray = new Array(data?.length).fill(false);
            //console.log("False ",falseArray);
            setDeleteToggle(falseArray);
        }
    },[loadingData,eliminar,deleteToggle?.length,data])
    /*useEffect(()=>{
        console.log("data_habs",data?.docs);
    },[data])*/
    return (
        <div>
            <ElementoLista clase="Habitaciones">
                    <div>
                        Tipo habitación
                    </div>
                    <div>
                        Precio
                    </div>
                    <div>
                        Numero/Estado
                    </div>
                    <div>
                        Editar
                    </div>
            </ElementoLista>
            {!loadingDataUsr&&!loadingData&&(deleteToggle?.length>0||!deleteToggle)&&(
                data.sort(
                    (a, b) => a.data().Numero_Habitacion-b.data().Numero_Habitacion
                    ).map((e,index)=>{
                    //console.log("e id",e);
                    if(dataUsr?.docs[0].data()?.rol==="administrador") return <HabitacionFila loadingData={loadingData}  key={e.id} e={e} index={index}
                        handleDelete={setDeleteToggle} deleteArray={deleteToggle}
                        eliminar={eliminar} habitaciones={habitaciones} estados={estadosHabitaciones}/>
                    else if (dataUsr?.docs[0].data()?.rol==="recepcionista" && e.data().estado !== "No disponible") return <HabitacionFila loadingData={loadingData}  key={e.id} e={e} index={index}
                    handleDelete={setDeleteToggle} deleteArray={deleteToggle}
                        eliminar={eliminar} habitaciones={habitaciones} estados={estadosHabitaciones}/>
                })
                )
            }
        </div>
    )
}