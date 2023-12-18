import { useCallback, useEffect, useState } from "react";
import { FilaFicha } from "./FilaFicha";
import { FichaHeaderStyle, FichaShowFilas, FilaFichaStyle } from "../../styles/FichaStyle";

export const ShowFilasFicha = ({
    payment,productos,setArrPay,arrPay, caja=false
}) =>{
    let laststate = true;
    let auxArr = [];
    const resultadoObjeto = {};

    // Iterar a través del objeto principal
    for (const key in productos) {
        if (productos.hasOwnProperty(key)) {
            const subObjeto = productos[key];

            // Verificar si el atributo 'valor' es igual a x
            if (subObjeto.Cantidad > subObjeto.Pagados) {
            // Agregar el subobjeto al resultado
            resultadoObjeto[key] = subObjeto;
            }
        }
    }
    useEffect(()=>{
        console.log("arrpay useEffect",arrPay);
        console.log("productos useEffect",productos);
    },[arrPay])
    const updateAuxArr = (arr,final_one) =>{
        //console.log("UPDATE AUXARR",arr);
        let lengthAuxArr;
        if(laststate){
            auxArr = []
            if(arr.length>0)auxArr.push(arr);
        } else{
            auxArr.push(arr);
        }
        laststate = final_one;
        lengthAuxArr = auxArr.length;
        if (final_one) {
            //console.log("LAST ONE");
            setArrPay(auxArr);
            auxArr=[];
        }
        //console.log("UPDATE AUXARR resultado",auxArr);
        return lengthAuxArr;
    };
    const handleCheckPay = useCallback((index_Rel) => {
        let auxArrPay1 = arrPay;
        console.log("indexRel",index_Rel);
        //console.log("arrPay",arrPay);
        console.log("auxArray1 before",auxArrPay1[index_Rel]);
        auxArrPay1[index_Rel][0] = !arrPay[index_Rel][0];
        console.log("auxArray1 after",auxArrPay1);
        console.log("arrPayafter",arrPay);
        setArrPay(auxArrPay1);
    },[auxArr])
    const sortRecibos = (a,b) =>{
        //console.log("a",a);
        //console.log("b",b);
        return a[0].localeCompare(b[0]);
    }
    return (
        <div>
            <FichaHeaderStyle numGrid={(!payment&&!caja)?"4":"3"}>
                <div>
                    Producto
                </div>
                <div>
                    Cantidad
                </div>
                <div>
                    Costo
                </div>
                <div>
                    {!payment&&!caja&&"Pagar"}
                </div>
            </FichaHeaderStyle>
            <FichaShowFilas>
                {payment
                ?
                Object.entries(productos).sort((a,b)=>sortRecibos(a,b)).map((val)=>{
                    console.log("IDK",val);
                    return(<FilaFicha key={val[0]} val={val} payed={true} payment={payment} caja={caja}/>);
                })
                :
                Object.entries(resultadoObjeto).sort((a,b)=>sortRecibos(a,b)).map((val,index)=>{
                    console.log("Recibo",val);
                    return(<FilaFicha key={val[0]} val={val} index_Abs={index} productos={resultadoObjeto}
                        handlePay={handleCheckPay} payment={payment} caja={caja}
                        arrPay={arrPay} modifyAuxArrPay={updateAuxArr} auxArrPay={auxArr}/>);
                })
                }
            </FichaShowFilas>
        </div>
    )
}