import { Button, IconButton } from "@mui/material"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";
import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { firestore } from "../../config/firebase";
import { useState } from "react";
import { FormCrearHab } from "../../components/Administrador/Habitacion/FormCrearHab";
import { MostrarHabs } from "../../components/MostrarHabs";
import { FormEliminar } from "../../components/Administrador/Habitacion/FormEliminar";
import { Retroceder } from "../../components/Retroceder";
export const Habitaciones = () => {
    const path = "habitaciones";
    const habitaciones = ["triple","doble","matrimonial","simple", "matrimonial con adicional", "queen", "cuadruple"];
    const [form, setForm] = useState(false);
    const [eliminar, setEliminar] = useState(false);
    const [confimar, setConfirmar] = useState(false);
    const [deleteToggle,setDeleteToggle] = useState([]);
    const q = query(collection(firestore,path),where("activa","==",true));
    
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
            deleteToggle.map((e,index)=>{
                if(e===true){
                    console.log(index, e);

                }
        })
        setEliminar(false); 
        setConfirmar(false);
    };
    const handleNoConfirmar = () => {setConfirmar(false)};
    return (
        <div>
            <div>
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
            </div>
            
            <MostrarHabs 
            q={q} eliminar={eliminar} deleteToggle={deleteToggle}
             setDeleteToggle={setDeleteToggle} habitaciones={habitaciones}/>
            <FormEliminar
             show={confimar} handleClose={handleCloseE}
              sinConfirmar={handleNoConfirmar}/>
            <FormCrearHab
             show={form} handleClose={handleCloseF}
              habitaciones={habitaciones}/>
        </div>
    )
}