import { addDoc, collection, doc, query, serverTimestamp, setDoc, where } from "firebase/firestore";
import { useEffect, useState } from "react"
import { useCreateUserWithEmailAndPassword, useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { firestore } from "../config/firebase";
import { Dropdownlist } from "./Dropdownlist";
export const LoginBox = (
    {auth,
    state
}
) => {
    const [correo,setCorreo] = useState("");
    const [contra,setContra] = useState("");
    const [crear, usrCre, loadCre, errCre] = useCreateUserWithEmailAndPassword(auth);
    const [login, usrLog, loadLog, errLog] = useSignInWithEmailAndPassword(auth);
    const q = query(collection(firestore, 'usuarios'),where("rol","==","recepcionista"));
    useEffect(()=>{
        setCorreo("");
    },[state])
    const signInorUp = async (accion) =>{
        let usr;
		if (accion === "signUp") {
            //console.log(correo);
            //console.log(contra);
			usr = await crear(correo,contra).then((usr_fb)=>{
                return usr_fb;
            });
            const docuRef = await doc(firestore, `usuarios/${usr.user.uid}`);
            setDoc(docuRef,{correo: correo, rol: state?"administrador":"recepcionista"});
            //console.log("here");
        } else if (accion === "signIn"){
            //console.log(correo);
            //console.log(contra);
			usr = await login(correo,contra).then((usr_fb)=>{
                return usr_fb;
            });
            console.log("recepcionista", state);
            if (!state){
                console.log("here recepecionista");
                const cajaRef = await collection(firestore, 'caja');
                const timestamp = serverTimestamp();
                const algo = await addDoc(cajaRef,{
                    fecha_hora: timestamp,
                    recepcionista: correo,
                    productos: [],
                    fichas: {},
                    ingresos: 0,
                });
                sessionStorage.setItem('cajaRef',algo.id);
                console.log("idCaja", algo.id);
            }
        }
        console.log(usr);
    };
    //console.log(`hola ${state}`);
    const handleEnter = (e) =>{
        if (e.key === "Enter"){
            //console.log("enter presionado");
            signInorUp("signIn");
        }
    }
	return (
		<div>
            {state ? (
                <>
                <input value={correo} placeholder="correo" type="email" 
                    onChange={(e)=>{setCorreo(e.target.value)}}
                    onKeyDown={handleEnter}
                >
                </input>
                <input value={contra} placeholder="contraseña" type="password"
                    onChange={(e)=>{setContra(e.target.value)}}
                    onKeyDown={handleEnter}
                >
        	    </input>
                <button onClick={() =>signInorUp("signIn")}>ingresar</button>
                <button onClick={() =>signInorUp("signUp")}>registrarse</button>
                </>
            ):
            <>
            <Dropdownlist updateData={setCorreo} q={q} val="correo" content="turno"/>
                <input value={contra} placeholder="contraseña" type="password" 
                    onChange={(e)=>{setContra(e.target.value)}}
                    onKeyDown={handleEnter}
                >
        	    </input>
                <button onClick={() =>signInorUp("signIn")}>ingresar</button>
            </>
            }
        </div>
    )
}