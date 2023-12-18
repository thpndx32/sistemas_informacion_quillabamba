import { Link} from "react-router-dom"
import { auth, firestore } from "../../config/firebase";
import { useSignOut } from "react-firebase-hooks/auth";
import { Filtros } from "../../components/Filtros/Filtros";
import { MostrarHabs } from "../../components/MostrarHabs";
import {  collection, doc, query, serverTimestamp, updateDoc, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { FormProductoInd } from "../../components/Recepcionista/FormProductoInd";
import { General, Salir } from "../../styles/General";
import { Header } from "../../styles/Header";
import { Listado } from "../../styles/Listado";
import { Filtro } from "../../styles/Filtro";
export const Recepcionista = () => {
    //console.log("Recepcionista");
    const path = "habitaciones";
    const [logOut] = useSignOut(auth);
    const q = query(collection(firestore,path),where("activa","==",true));
    const [productoIndividual, setProductoIndividual] = useState(false);
    const [filteredQuery, setFilteredQuery] = useState([]);
    const cajaId = sessionStorage.getItem('cajaRef');
    const cajaRef = doc(firestore,'caja',cajaId);
    const [initialQuery, setInitialQuery] = useState(true);
    const handleFilterQuery = (val)=>{
        setFilteredQuery(val);
    }
    const  handleInitialQuery = (val)=>{
        setInitialQuery(val);
    }
    useEffect (()=>{
        if(filteredQuery===0){
            handleInitialQuery(true);
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
        <General>
            <Header>
                <Salir onClick={handleCierre}>
                    Salir de la cuenta
                </Salir>
                <button onClick={()=>handleProducto()}>
                    Registrar producto individual
                </button>
                <Link to={"Caja"} relative="path">
                    <button>
                        Ver Caja
                    </button>
                </Link>
            </Header>
            <Listado>
                <Filtro>
                    Filtrar segun
                    <Filtros setFilteredQuery={handleFilterQuery} q={q} path={path} initialQuery={initialQuery} setInitialQuery={handleInitialQuery}/>
                </Filtro>
                <MostrarHabs q={filteredQuery} initialQuery={initialQuery}/>
            </Listado>
            {productoIndividual&&<FormProductoInd show={productoIndividual} handleClose={()=>{setProductoIndividual(false)}}/>}
        </General>
    )
}