import { IconButton } from "@mui/material";
import { useEffect, useState } from "react"
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

export const FilaFicha = ({
    val, payed=false, index_Abs, handlePay, productos,
     payment, arrPay, modifyAuxArrPay, auxArrPay
})=>{
    const [pay, setPay] = useState(false);
    const [index_Rel, setIndexRel] = useState(-1);
    const handlePayHere = () => {
        setPay(!pay);
        handlePay(index_Rel);
    }
    useEffect(()=>{
        console.log("Here oficial");
        if(productos&&(index_Abs>-1)&&auxArrPay&&arrPay){
            console.log("Here inside");
            if(Object.entries(productos).length === index_Abs+1&&auxArrPay.length!==arrPay.length&&auxArrPay.length>0){
                console.log("More inside");
                console.log(auxArrPay);
                console.log(arrPay);
                modifyAuxArrPay([],true);
            }
        }
    },[auxArrPay?.length])
    useEffect(()=>{
        if(!payment&&val[1].Recibo===''){
            //console.log("Recibo",val)
            const updateAuxArr = [false,index_Abs,val];
            if(JSON.stringify(arrPay[auxArrPay.length-1])!==JSON.stringify(updateAuxArr)){
                //console.log("here with temp");
                //console.log("productos",productos);
                //console.log("index abs",index_Abs);
                let temp = modifyAuxArrPay(updateAuxArr,Object.entries(productos).length === index_Abs+1)-1;
                setIndexRel(temp);
                console.log("temporal",temp);
            }
        }
    },[])
    if (payment){
        if(val[1].Recibo!==''){
            return (
                <div key={val[0]}>
                    {val[0]}
                    {val[1].Cantidad}
                    {val[1].Costo}
                    {!payed && 
                        <IconButton onClick={handlePayHere}>
                            {pay?<CheckBoxIcon/>:<CheckBoxOutlineBlankIcon/>}
                        </IconButton>
                    }
                </div>
            )
        }
    } else{
        if(val[1].Recibo===''){
            return (
                <div key={val[0]}>
                    {val[0]}
                    {val[1].Cantidad}
                    {val[1].Costo}
                    {!payed && 
                        <IconButton onClick={handlePayHere}>
                            {pay?<CheckBoxIcon/>:<CheckBoxOutlineBlankIcon/>}
                        </IconButton>
                    }
                </div>
            )
        }
    }
    return null;
}