import { useEffect, useState } from "react"
import { Retroceder } from "../../components/Retroceder"
import { FormControlLabel, Switch } from "@mui/material";
import { useCollection } from "react-firebase-hooks/firestore";
import { firestore } from "../../config/firebase";
import { collection } from "firebase/firestore";
import { format } from 'date-fns';
import { FilaIngresosTurno } from "../../components/Administrador/Ingresos/FilaIngresosTurno";
import { General } from "../../styles/General";
import { Header } from "../../styles/Header";
import { ElementoLista, Listado } from "../../styles/Listado";

export const ContrIngresos = () =>{
    const [dataCajas, loadingDataCajas] = useCollection(collection(firestore,'caja'));
    return (
        <General>
            <Header>
                <Retroceder/>
            </Header>
            <Listado>
            <ElementoLista clase="Ingresos">
                <div>
                    Apertura Caja
                </div>
                <div>
                    Cierre Caja
                </div>
                <div>
                    Ganancias
                </div>
                <div>
                    Informacion
                </div>
            </ElementoLista>
                {!loadingDataCajas&&dataCajas.docs.sort((a,b) => b.data()?.fecha_hora.toDate() - a.data().fecha_hora.toDate()).map((doc,index)=>{
                        return(
                            <FilaIngresosTurno key={index} fila={doc} index={index}/>
                        )
                    }
                )}
            </Listado>
        </General>
    )
}