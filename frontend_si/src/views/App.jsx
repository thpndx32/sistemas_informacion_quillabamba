import logo from '../Assets/logo.svg';
import './App.css';
import { LoginBox } from '../components/LoginBox';
import { auth, firestore } from '../config/firebase';
import { Switch } from '../components/Switch';
import { useContext, useEffect, useState } from 'react';
import { useAuthState, useSignOut } from 'react-firebase-hooks/auth';
import { AuthContext } from './AppQuillabamba';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, query, where } from 'firebase/firestore';
import { Navigate, redirect } from 'react-router-dom';

function App({
  setCajaRef
}) {
  const [state, setState] = useState(false);
  const negateState = () =>{
    setState(!state);
  }
  const [usr] = useContext(AuthContext);
  const [logOut] = useSignOut(auth);
  //console.log("USR",usr);
  const [value] = useCollection(
    query(collection(firestore, 'usuarios'),where("correo","==",`${usr?.email}`)),
    {
        snapshotListenOptions: { includeMetadataChanges: true },
      }
  );
  useEffect(()=>{
    sessionStorage.setItem('cajaRef','_');
  },[])
  //if(value) {value.docs.map((doc)=>(console.log("valor",doc.get('correo'))));}
  //console.log("valor_val",value);
  return (
    <div className="App">
      <header className="App-header">
        <Switch variable={negateState}></Switch>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        {
          usr?(
            value ? (
              value.docs.map((doc)=>(
                <Navigate to={doc.get("rol")}/>
              ))
            ):
            <button onClick={async ()=>await logOut()}>
                Salir sesion
            </button>
          )
          :
          <LoginBox auth={auth} state={state} setCajaRef={setCajaRef}></LoginBox>
        }
      </header>
    </div>
  );
}

export default App;
