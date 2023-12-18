import { useEffect } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { ItemsFila } from "./ItemsFila";
import { ElementoLista, Listado } from "../../../styles/Listado";

export const MostrarItems = (
    {q, eliminar, deleteToggle, setDeleteToggle, dataArray}
) => {
    const [data, loadingData, errData] = useCollection(q);
    useEffect(()=>{
        if (!loadingData && data?.docs.length > 0) {
            const falseArray = new Array(data?.docs.length).fill(false);
            //console.log("False ",falseArray);
            setDeleteToggle(falseArray);
        }
    },[loadingData,eliminar,deleteToggle.length,data])
    useEffect(()=>{
        //console.log("data_habs",data?.docs);
    },[data])
    return (
        <Listado>
                <ElementoLista>
                    <div>
                        Producto
                    </div>
                    <div>
                        Stock
                    </div>
                    <div>
                        Precio
                    </div>
                    <div>
                        Comerciabilidad
                    </div>
                    <div>
                        Editar
                    </div>
                </ElementoLista>
                {!loadingData&&deleteToggle.length>0&&(
                    data.docs.sort((a,b)=>{
                        const nombreA = a.data().Nombre.toLowerCase();
                        const nombreB = b.data().Nombre.toLowerCase();
                        return nombreA.localeCompare(nombreB);
                    }).map((e,index)=>{
                        //console.log("e id",e.ref);
                        return <ItemsFila loadingData={loadingData}  key={e.id} e={e} index={index}
                         handleDelete={setDeleteToggle} deleteArray={deleteToggle}
                          eliminar={eliminar} data={dataArray}/>
                    })
                    )
                }
        </Listado>
    )
}