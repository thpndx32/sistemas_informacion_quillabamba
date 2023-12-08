import { useEffect } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { ItemsFila } from "./ItemsFila";

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
        <div>
            <ul>
                {!loadingData&&deleteToggle.length>0&&(
                    data.docs.map((e,index)=>{
                        //console.log("e id",e.ref);
                        return <ItemsFila loadingData={loadingData}  key={e.id} e={e} index={index}
                         handleDelete={setDeleteToggle} deleteArray={deleteToggle}
                          eliminar={eliminar} data={dataArray}/>
                    })
                    )
                }
            </ul>
        </div>
    )
}