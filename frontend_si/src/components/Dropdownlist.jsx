import { useEffect, useState } from "react";
import { useCollection, useCollectionData } from "react-firebase-hooks/firestore";
import { firestore } from "../config/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export const Dropdownlist = (
    {updateData,q,arrData,defaultValue, val, content},
) => {
    const [value, loading, error] = useCollection(q);
    const handleChange = (event) => {
        //console.log("evento",event);
        updateData(event?.target.value);
    };
    //console.log(value);
    return (
        <select onChange={handleChange}>
            {q?(loading ? <option>
                cargando
            </option>:(!defaultValue?
                <option>
                    Selecciona una opcion
                </option>:
                    <option>
                        {defaultValue}
                    </option>
                )):(!defaultValue?
                    <option>
                        Selecciona una opcion
                    </option>:
                        <option>
                            {defaultValue}
                        </option>
                    )
            }
            {q&&(value &&(
                value.docs.map((doc) => (
                        <option key={doc.id} value={doc.get(val)}>
                            {doc.get(content)}
                        </option>
                    )
                )))
            }
            {arrData&&arrData?.length>0&&(
                    arrData.map((e, index)=>(
                        e!=defaultValue&&<option key={index}>
                            {e}
                        </option>
                    )
                    )
                )
            }
        </select>
    )
}