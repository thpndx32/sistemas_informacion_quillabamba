import { redirect } from "react-router-dom"
import { auth, firestore } from "../../config/firebase";
import { useSignOut } from "react-firebase-hooks/auth";
import { Filtros } from "../../components/Recepcionista/Filtros";
import { MostrarHabs } from "../../components/MostrarHabs";
import { collection, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { FormProductoInd } from "../../components/Recepcionista/FormProductoInd";

export const Intersection = (arrays) => {
    
    console.log("arrays intersecting", arrays);
    console.log("arrays intersecting", arrays[0]);
    if (!arrays || arrays.length === 0) {
        if (arrays.length[0])console.log("arrays HERE");
      return [];
    }
    // Inicializar la intersección con el primer array
    let interseccion = arrays[0];
  
    // Iterar sobre los demás arrays
    for (let i = 1; i < arrays.length; i++) {
      // Filtrar los elementos que están presentes en ambos conjuntos
      interseccion = interseccion.filter(element => arrays[i].includes(element));
    }
  
    return interseccion;
  }

export const Recepcionista = () => {
    const path = "habitaciones";
    const [logOut, loadingLogOut, errorLogOut] = useSignOut(auth);
    const q = query(collection(firestore,path),where("activa","==",true));
    const [productoIndividual, setProductoIndividual] = useState(false);
    const [filteredQuery, setFilteredQuery] = useState([]);
    const [initialQuery, setInitialQuery] = useState(true);
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
            <div>
                Filtrar segun
                <Filtros setFilteredQuery={setFilteredQuery} q={q} path={path} initialQuery={initialQuery} setInitialQuery={setInitialQuery}/>
            </div>
            <MostrarHabs q={filteredQuery} initialQuery={initialQuery}/>
            <button onClick={()=>handleCierre()}>
                Cerrar caja
            </button>
            {productoIndividual&&<FormProductoInd show={productoIndividual} handleClose={()=>{setProductoIndividual(false)}}/>}
        </div>
    )
}