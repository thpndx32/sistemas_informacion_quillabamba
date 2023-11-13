import React, { useState, useEffect } from 'react';
import { firestore } from '../config/firebase';
import { and, collection, limit, query, where } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { SearchComponent } from './SearchComponent';
import { FilaPI } from './Recepcionista/FilaPI';

export const SearchBox = (
    {Collection,atributo, ficha, handleOrders, Orders}
) => {
    const [searchTerm, setSearchTerm] = useState("");
    const q = query(collection(firestore,Collection),
    where(atributo, '>=', searchTerm),where(atributo, '<=', searchTerm + '\uf8ff'),
    limit(20));
    const [data, loadingData, errData ] = useCollection(q);
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
      {loadingData ? <p>Cargando...</p>
      :(<>
        {data?.docs.map((doc,index)=>{
            return (
                <FilaPI key={index} doc={doc} ficha={ficha} addOrder={addOrder} 
                OrdersLength={ordersLenght} cambio={cambio} checkOrder={checkOrder}/>
            )
        })}
      </>)}
    </div>
  );
};
