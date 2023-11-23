import React, { useState, useEffect } from 'react';
import { firestore } from '../config/firebase';
import { and, collection, limit, query, where } from 'firebase/firestore';
import { useCollection, useCollectionData } from 'react-firebase-hooks/firestore';
import { SearchComponent } from './SearchComponent';
import { FilaPI } from './Recepcionista/FilaPI';

export const SearchBox = (
    {Collection,atributo, ficha, handleOrders, Orders}
) => {
    console.log("atributo",atributo);
    const [searchTerm, setSearchTerm] = useState("");
    const collectionRef = collection(firestore,Collection);
    const q = query(collectionRef,
    where(atributo, "<=", searchTerm + '\uf8ff'),where(atributo, ">=", searchTerm),where("Comerciabilidad", "==", true),
    limit(10));
    const q1 = query(collectionRef,
    where(atributo+"1", '>=', searchTerm),where(atributo+"1", '<=', searchTerm + '\uf8ff'),where("Comerciabilidad", "==", true),
    limit(10));
    const q2 = query(collectionRef,
    where(atributo+"2", '>=', searchTerm),where(atributo+"2", '<=', searchTerm + '\uf8ff'),where("Comerciabilidad", "==", true),
    limit(10));
    const [data0, loadingData0] =useCollection(q);
    const [data1, loadingData1] =useCollection(q1);
    const [data2, loadingData2] =useCollection(q2);
    const union = (...arrays) => {
        return [...new Set(arrays.flat())];
    };
    const [collectedData, setCollectedData] = useState([]);
    useEffect(()=>{
        console.log("data0",data0)
        console.log("data1",data1)
        console.log("data2",data2)
        setCollectedData(union(data0?.docs||[],data1?.docs||[],data2?.docs||[]))
        console.log("collected Data",collectedData);
    },[loadingData0,loadingData1,loadingData2]);
    const [ordersLenght, setOrdersLenght] = useState(Orders.length);
    const [cambio, setCambio] = useState(true);
    useEffect(()=>{
        setOrdersLenght(Orders.length);
        console.log("Orders.Length searchbox",Orders.length);
        console.log("OrdersLength searchbox",ordersLenght);
        if(ordersLenght < Orders.length){
            setCambio(true);
        } else {
            setCambio(false);
        }
    },[Orders.length])
    const handleSearch = (searchTerm) => {
        setSearchTerm(searchTerm)
  };
  const addOrder = ( product, indexOrder) =>{
        //console.log(Orders);
        if(product[1]!==0){
            console.log("index addOrder", indexOrder);
            if(indexOrder>-1&&indexOrder<Orders.length){
                let arr = Orders;
                arr[indexOrder][1] += product[1];
                console.log(arr[indexOrder][1]);
                handleOrders([...arr]);
                return indexOrder;
            }else {
                const index = Orders.length;
                handleOrders([...Orders,product]);
                return index;
            }
        }
        return -1;
  }
  const checkOrder = (doc, indexOrder) =>{
    if (Orders[indexOrder]){
        console.log("valid index",indexOrder);
        console.log(doc.ref);
        if (doc.ref.id === Orders[indexOrder][0].ref.id){
            return true;
        } else {
            return false;
        }
    } else{
        return false;
    }
  }
  return (
    <div>
      <SearchComponent onSearch={handleSearch} />
      {(loadingData0 && loadingData1 && loadingData2)? <p>Cargando...</p>
      : searchTerm!==""&&(<>
        {collectedData.map((doc,index)=>{
            console.log("doc",doc);
            return (
                <FilaPI key={index} doc={doc} ficha={ficha} addOrder={addOrder} Orders={Orders} 
                OrdersLength={ordersLenght} cambio={cambio} checkOrder={checkOrder}/>
            )
        })}
      </>)}
    </div>
  );
};
