import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { Retroceder } from "../../components/Retroceder"
import { auth, firestore } from "../../config/firebase";
import { useDocument } from "react-firebase-hooks/firestore";
import { FormControlLabel, Switch } from "@mui/material";
import { useState } from "react";
import { FichaCaja } from "../../components/Recepcionista/Caja/FichaCaja";
import { ProductoCaja } from "../../components/Recepcionista/Caja/ProductoCaja";
import { useSignOut } from "react-firebase-hooks/auth";

export const Caja = () => {
    const cajaId = sessionStorage.getItem('cajaRef');
    const cajaRef = doc(firestore,'caja',cajaId);
    const [logOut] = useSignOut(auth);
    const [toSee, setToSee] = useState(false);
    const [data, loadingData] = useDocument(cajaRef);
    console.log("caja id",cajaId)
    const handleCierre = async() => {
        await updateDoc(cajaRef,{
            fecha_hora_cierre: serverTimestamp(),
        });
        await logOut();
    }
    return (
        <div>
            <Retroceder/>
            <FormControlLabel
            control={<Switch
                checked={toSee}
                onChange={()=>{setToSee(!toSee)}}
            />} label={toSee?"Fichas":"Productos Individuales"}
            />
            {!loadingData&&(!toSee?
            data.data().productos.map((producto)=>{
                return <ProductoCaja producto={producto}/>
            })
            :Object.entries(data.data().fichas).map((ficha)=>{
                return <FichaCaja ficha={ficha}/>
            }))}
            <button onClick={()=>handleCierre()}>
                Cerrar caja
            </button>
        </div>
    )
}