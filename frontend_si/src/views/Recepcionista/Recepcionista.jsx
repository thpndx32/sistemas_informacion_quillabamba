import { Link} from "react-router-dom"
import { auth, firestore } from "../../config/firebase";
import { useSignOut } from "react-firebase-hooks/auth";
import { Filtros } from "../../components/Filtros/Filtros";
import { MostrarHabs } from "../../components/MostrarHabs";
import { Timestamp, collection, doc, query, serverTimestamp, updateDoc, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { FormProductoInd } from "../../components/Recepcionista/FormProductoInd";

export const Intersection = (arrays) => {
    
    //console.log("arrays intersecting", arrays);
    //console.log("arrays intersecting", arrays[0]);
    if (!arrays || arrays.length === 0) {
        //if (arrays.length[0])console.log("arrays HERE");
      return [];
    }
    // Inicializar la intersección con el primer array
    let interseccion = arrays[0];
    //console.log("interseccion",interseccion);
    let arrData = [];
    for (let i = 1; i < arrays.length; i++) {
        let arrDatai = [];
        for (let j = 0; j < arrays[i].length; j++){
            //console.log("element",arrays[i][j].data());
            arrDatai.push(JSON.stringify(arrays[i][j].data()));
        }
        arrData.push(arrDatai);
    }
    //console.log("arrData",arrData);
    // Iterar sobre los demás arrays
    for (let i = 0; i < arrData.length; i++) {
      // Filtrar los elementos que están presentes en ambos conjuntos
      interseccion = interseccion.filter(element => arrData[i].includes(JSON.stringify(element.data())));
      //console.log("interseccion",interseccion);
    }
  
    return interseccion;
  }

export const Recepcionista = () => {
    const path = "habitaciones";
    const [logOut] = useSignOut(auth);
    const q = query(collection(firestore,path),where("activa","==",true));
    const [productoIndividual, setProductoIndividual] = useState(false);
    const [filteredQuery, setFilteredQuery] = useState([]);
    const cajaId = sessionStorage.getItem('cajaRef');
    const cajaRef = doc(firestore,'caja',cajaId);
    const [initialQuery, setInitialQuery] = useState(true);
    useEffect (()=>{
        if(filteredQuery===0){
            setInitialQuery(true);
        }
    },[filteredQuery.length,filteredQuery])
    const handleProducto = () => {
        setProductoIndividual(true);
    };
    const handleCierre = async() =>{
        await updateDoc(cajaRef,{
            fecha_hora_cierre: serverTimestamp(),
        })
        await logOut();
    }
    return(
        <div>
            <button onClick={handleCierre}>
                Salir de la cuenta
            </button>
            <button onClick={()=>handleProducto()}>
                Registrar producto individual
            </button>
            <Link to={"Caja"} relative="path">
                <button>
                    Ver Caja
                </button>
            </Link>
            <div>
                Filtrar segun
                <Filtros setFilteredQuery={setFilteredQuery} q={q} path={path} initialQuery={initialQuery} setInitialQuery={setInitialQuery}/>
            </div>
            <MostrarHabs q={filteredQuery} initialQuery={initialQuery}/>
            {productoIndividual&&<FormProductoInd show={productoIndividual} handleClose={()=>{setProductoIndividual(false)}}/>}
        </div>
    )
}