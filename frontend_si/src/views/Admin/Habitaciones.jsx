import { Button} from "@mui/material"
import { collection, getDocs, query, updateDoc, where } from "firebase/firestore";
import { firestore } from "../../config/firebase";
import { useEffect, useState } from "react";
import { FormCrearHab } from "../../components/Administrador/Habitacion/FormCrearHab";
import { MostrarHabs } from "../../components/MostrarHabs";
import { FormEliminar } from "../../components/Administrador/Habitacion/FormEliminar";
import { Retroceder } from "../../components/Retroceder";
import { Filtros } from "../../components/Filtros/Filtros";
import { General } from "../../styles/General";
import { Header } from "../../styles/Header";
import { Listado } from "../../styles/Listado";
import { Filtro, FiltroNuevo } from "../../styles/Filtro";
export const habitaciones = ["triple","doble","matrimonial","simple", "matrimonial con adicional","matrimonial con doble adicional", "queen", "cuadruple"];
export const Habitaciones = () => {
    const path = "habitaciones";
    const [form, setForm] = useState(false);
    const [eliminar, setEliminar] = useState(false);
    const [confimar, setConfirmar] = useState(false);
    const [deleteToggle,setDeleteToggle] = useState([]);
    const q = query(collection(firestore,path),where("activa","==",true));
    const [filteredQuery, setFilteredQuery] = useState([]);
    const [initialQuery, setInitialQuery] = useState(true);
    useEffect (()=>{
        //console.log("USE EFFECT");
        console.log("Habitaciones filtered Query",filteredQuery);
        //console.log(JSON.stringify(q));
        if(JSON.stringify(filteredQuery[0]) === JSON.stringify(q)){
            console.log("USE EFFECT");
            setInitialQuery(true);
        }
    },[filteredQuery])
    const handleFilters = (val)=>{
        console.log("Habitaciones handleFilters",val);
        setFilteredQuery(val);
    }
    const handleCloseF = () => {setForm(false)};
    const handleCloseE = () => {
        console.log("deleteToggle", deleteToggle);
        let num_trues = 0;
        getDocs(q).then(async (querySnapshot) => {
        const updatePromises = querySnapshot.docs.map(async (doc,index) => {
            if(deleteToggle[index] === true){
            num_trues++;
            console.log("here");
            try {
                // Realiza la actualización en cada documento y devuelve la promesa
                return updateDoc(doc.ref, { activa: false });
            } catch (error) {
                console.error(`Error al actualizar el documento ${doc.id}: ${error}`);
            }}
        });

            // Espera a que todas las promesas de actualización se completen
            await Promise.all(updatePromises);
            const newArray = new Array(deleteToggle.length-num_trues).fill(false);
            //console.log("length",deleteToggle.length, "num_trues: ", num_trues)
            //console.log("newArray",newArray);
            setDeleteToggle(newArray);

            console.log('Documentos actualizados en lote.');
        })
        .catch((error) => {
            console.error('Error al obtener documentos:', error);
        });
        setEliminar(false); 
        setConfirmar(false);
    };
    const handleNoConfirmar = () => {setConfirmar(false)};
    return (
        <General>
            <Header>
                {eliminar?
                    <div>
                        <Retroceder toDo={()=>setEliminar(!eliminar)}/>
                        <Button onClick={()=>{setConfirmar(!confimar)}} disabled={!deleteToggle.includes(true)}>
                        Eliminar Habitaciones seleccionadas
                        </Button>
                    </div>                    
                    :
                    <div>
                        <Retroceder/>
                        <Button onClick={()=>{setForm(!form)}} >
                            Añadir Habitacion
                        </Button>
                        <Button onClick={()=>{setEliminar(!eliminar)}} disabled={deleteToggle.length===0}>
                            Eliminar Habitaciones
                        </Button>
                    </div>
                }
            </Header>
            <Listado>
            <Filtro>
                Filtrar segun
                <Filtros setFilteredQuery={handleFilters} q={q} path={path} initialQuery={initialQuery} setInitialQuery={setInitialQuery}/>
            </Filtro>
            <MostrarHabs q={filteredQuery} eliminar={eliminar} deleteToggle={deleteToggle}
             setDeleteToggle={setDeleteToggle} habitaciones={habitaciones} initialQuery={initialQuery}/>
            </Listado>
            <FormEliminar
             show={confimar} handleClose={handleCloseE}
              sinConfirmar={handleNoConfirmar}/>
            {form&&<FormCrearHab
             show={form} handleClose={handleCloseF}
              habitaciones={habitaciones}/>}
        </General>
    )
}