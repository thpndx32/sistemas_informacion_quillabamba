import { IconButton } from "@mui/material";
import { useEffect, useState } from "react"
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { FilaFichaStyle } from "../../styles/FichaStyle";

export const FilaFicha = ({
    val, payed=false, index_Abs, handlePay, productos,
     payment, arrPay, modifyAuxArrPay, auxArrPay, caja
})=>{
    const [pay, setPay] = useState(false);
    const [index_Rel, setIndexRel] = useState(-1);
    const precioUnitario = val[1].Costo/val[1].Cantidad;
    const handlePayHere = () => {
        setPay(!pay);
        handlePay(index_Rel);
    }
    useEffect(()=>{
        //console.log("Here oficial");
        if(productos&&(index_Abs>-1)&&auxArrPay&&arrPay){
            //console.log("Here inside");
            if(Object.entries(productos).length === index_Abs+1&&auxArrPay.length!==arrPay.length&&auxArrPay.length>0){
                //console.log("More inside");
                //console.log(auxArrPay);
                //console.log(arrPay);
                modifyAuxArrPay([],true);
            }
        }
        if(!payment&&val[1].Cantidad>val[1].Pagados){
            //console.log("Recibo",val)
            const val_notpayed = [...val];
            console.log(val);
            val_notpayed[1].Cantidad = val[1].Cantidad-val[1].Pagados;
            console.log("not Payed",val_notpayed[1]);
            console.log(auxArrPay);
            const updateAuxArr = [false,index_Abs,val_notpayed];
            console.log(JSON.stringify(updateAuxArr));
            if(!caja&&auxArrPay.length>=0&&JSON.stringify(arrPay[auxArrPay.length-1])!==JSON.stringify(updateAuxArr)){
                console.log("here with temp");
                //console.log("productos",productos);
                //console.log("index abs",index_Abs);
                let temp = modifyAuxArrPay(updateAuxArr,Object.entries(productos).length === index_Abs+1)-1;
                setIndexRel(temp);
                console.log("temporal",temp);
            }
        }
    },[auxArrPay?.length])
    if (payment){
        if(!(val[1].Cantidad>val[1].Pagados)||val[1].Pagados>0){
            return (
                <FilaFichaStyle numGrid={(!payed?"4":"3")} clase="Producto" key={val[0]}>
                    <div>
                        {val[0]}
                    </div>
                    <div>
                        {val[1].Pagados}
                    </div>
                    <div>
                        {precioUnitario*val[1].Pagados}
                    </div>
                    <div>    
                        {!payed && 
                            <IconButton onClick={handlePayHere}>
                                {pay?<CheckBoxIcon/>:<CheckBoxOutlineBlankIcon/>}
                            </IconButton>
                        }
                    </div>
                </FilaFichaStyle>
            )
        }
    } else{
        if(val[1].Cantidad>val[1].Pagados){
            return (
                <FilaFichaStyle numGrid={(!payed && !caja?"4":"3")} clase="Producto" key={val[0]}>
                    <div>
                        {val[0]}
                    </div>
                    <div>
                        {val[1].Cantidad-val[1].Pagados}
                    </div>
                    <div>
                        {precioUnitario*(val[1].Cantidad-val[1].Pagados)}
                    </div>
                    <div>
                    {!payed && !caja && 
                        <IconButton onClick={handlePayHere}>
                            {pay?<CheckBoxIcon/>:<CheckBoxOutlineBlankIcon/>}
                        </IconButton>
                    }
                    </div>
                </FilaFichaStyle>
            )
        }
    }
    return null;
}