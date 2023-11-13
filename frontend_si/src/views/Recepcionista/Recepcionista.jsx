import { redirect } from "react-router-dom"
import { auth, firestore } from "../../config/firebase";
import { useSignOut } from "react-firebase-hooks/auth";
import { Filtros } from "../../components/Recepcionista/Filtros";
import { MostrarHabs } from "../../components/MostrarHabs";
import { collection, query, where } from "firebase/firestore";
import { useState } from "react";
import { FormProductoInd } from "../../components/Recepcionista/FormProductoInd";

export const Recepcionista = () => {
    const path = "habitaciones";
    const [logOut, loadingLogOut, errorLogOut] = useSignOut(auth);
    const q = query(collection(firestore,path),where("activa","==",true));
    const [productoIndividual, setProductoIndividual] = useState(false);
    const handleCierre = async() => {
        
    }
    const handleProducto = () => {
        setProductoIndividual(true);
    };
    return(
        <div>
            <button onClick={async ()=>await logOut()}>
                Salir de la cuenta
            </button>
            <button onClick={()=>handleProducto()}>
                Registrar producto individual
            </button>
            <Filtros/>
            <MostrarHabs q={q}/>
            <button onClick={()=>handleCierre()}>
                Cerrar caja
            </button>
            {productoIndividual&&<FormProductoInd show={productoIndividual} handleClose={()=>{setProductoIndividual(false)}}/>}
        </div>
    )
}