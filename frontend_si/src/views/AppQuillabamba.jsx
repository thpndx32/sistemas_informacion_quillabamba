import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import { PrivateRoutes } from "../util/PrivateRoutes";
import { Admin } from "./Admin/Admin";
import { Recepcionista } from "./Recepcionista/Recepcionista";

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore } from "../config/firebase";
import { createContext, useState } from "react";
import { ContrIngresos } from "./Admin/ContrIngresos";
import { Inventario } from "./Admin/Inventario";
import { Habitaciones } from "./Admin/Habitaciones";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, query, where } from "firebase/firestore";
import { Caja } from "./Recepcionista/Caja";

export const AuthContext = createContext();

export const AppQuillabamba = () => {

    const [usr,loadingusr, errorusr] = useAuthState(auth);
    const [data , loadingData, errorData] = useCollection(query(collection(firestore,"usuarios"),where("correo","==",`${usr?.email}`)));
    const [cajaRef, setCajaRef] = useState();
    //console.log("data",data);
    //console.log("quilla",usr);
    return (
        (!loadingusr && <AuthContext.Provider value={[usr,data, loadingData,cajaRef]}>
            <BrowserRouter basename="quillabamba">
            <Routes>
            <Route path='/' element={
                        <App setCajaRef={setCajaRef}/>
            }>
            </Route>
            <Route element={
                        <PrivateRoutes/>
            }>
                <Route element={<PrivateRoutes usrType="administrador" prevPage={true}/>}>
                    <Route element={<Admin/>} path='/administrador'>
                    </Route>
                    <Route path="administrador/control_de_ingresos" element={
                            <ContrIngresos/>
                        }> </Route>
                    <Route path="administrador/habitaciones" element={
                        <Habitaciones/>
                    }> </Route>
                    <Route path="administrador/inventario" element={
                        <Inventario/>
                    }> </Route>
                </Route>
                <Route element={<PrivateRoutes usrType="recepcionista" prevPage={true}/>}>
                    <Route element={<Recepcionista/>} path='/recepcionista'/>
                    <Route element={<Caja/>} path='/recepcionista/caja'/>
                </Route>
            </Route>
            </Routes>
            </BrowserRouter>
        </AuthContext.Provider>)
    )
};