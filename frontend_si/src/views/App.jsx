import logo from '../Assets/logo.svg';
import './App.css';
import { LoginBox } from '../components/LoginBox';
import { auth, firestore } from '../config/firebase';
import { Switch } from '../components/Switch';
import { useContext, useState } from 'react';
import { useAuthState, useSignOut } from 'react-firebase-hooks/auth';
import { AuthContext } from './AppQuillabamba';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, query, where } from 'firebase/firestore';
import { Navigate, redirect } from 'react-router-dom';

function App() {
  const [state, setState] = useState(false);
  const negateState = () =>{
    setState(!state);
  }
  const [usr] = useContext(AuthContext);
  //console.log("USR",usr);
  const [value, loadingValue, errValue] = useCollection(
    query(collection(firestore, 'usuarios'),where("correo","==",`${usr?.email}`)),
    {
        snapshotListenOptions: { includeMetadataChanges: true },
      }
  );
  if(value) {value.docs.map((doc)=>(console.log("valor",doc.get('correo'))));}
  console.log("valor_val",value);
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
            value && (
              value.docs.map((doc)=>(
                <Navigate to={doc.get("rol")}/>
              ))
            )
          )
          :
          <LoginBox auth={auth} state={state}></LoginBox>
        }
      </header>
    </div>
  );
}

export default App;
