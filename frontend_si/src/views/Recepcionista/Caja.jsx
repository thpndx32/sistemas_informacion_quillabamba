import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { Retroceder } from "../../components/Retroceder"
import { auth, firestore } from "../../config/firebase";
import { useDocument } from "react-firebase-hooks/firestore";
import { FormControlLabel, Switch } from "@mui/material";
import { useEffect, useState } from "react";
import { FichaCaja } from "../../components/Recepcionista/Caja/FichaCaja";
import { ProductoCaja } from "../../components/Recepcionista/Caja/ProductoCaja";
import { useSignOut } from "react-firebase-hooks/auth";
import { General } from "../../styles/General";
import { Header } from "../../styles/Header";
import { Listado } from "../../styles/Listado";
import { TextFill } from "../../styles/TextFill";

export const Caja = () => {
    const cajaId = sessionStorage.getItem('cajaRef');
    const cajaRef = doc(firestore,'caja',cajaId);
    const [logOut] = useSignOut(auth);
    const [toSee, setToSee] = useState(false);
    const [data, loadingData] = useDocument(cajaRef);
    console.log("caja id",cajaId)
    useEffect(()=>{
        if(!loadingData)console.log("data",data.data());
    },[loadingData])
    const handleCierre = async() => {
        await updateDoc(cajaRef,{
            fecha_hora_cierre: serverTimestamp(),
        });
        await logOut();
    }
    return (
        <General>
            <Header>
            <Retroceder/>
            <FormControlLabel
            control={<Switch
                checked={toSee}
                onChange={()=>{setToSee(!toSee)}}
            />} label={toSee?"Fichas":"Productos Individuales"}
            />
            <button onClick={()=>handleCierre()}>
                Cerrar caja
            </button>
            </Header>
            <Listado clase="Caja">
                {!loadingData&&((data.data().productos.length>0||Object.entries(data.data().fichas).length>0)?(!toSee?(data.data().productos.length>0?(
                data.data().productos.map((producto,index)=>{
                    return <ProductoCaja key={index} producto={producto}/>
                })):
                <TextFill>
                    No se ha registrado ningun producto individual hasta el momento
                </TextFill>
                )
                :(Object.entries(data.data().fichas).length>0?
                    Object.entries(data.data().fichas).map((ficha,index)=>{
                    return <FichaCaja key={index} ficha={ficha}/>
                }):<TextFill>
                    No se registraron fichas hasta el momento
                </TextFill>)):
                <TextFill>
                    No se registro ningun ingreso hasta el momento
                </TextFill>
                )}
            </Listado>
        </General>
    )
}