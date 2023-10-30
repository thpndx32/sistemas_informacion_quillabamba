import { redirect } from "react-router-dom"
import { auth } from "../../config/firebase";
import { useSignOut } from "react-firebase-hooks/auth";
import { ListaHabitaciones } from "../../components/Recepcionista/ListaHabitaciones";
import { Filtros } from "../../components/Recepcionista/Filtros";

export const Recepcionista = () => {
    const [logOut, loadingLogOut, errorLogOut] = useSignOut(auth);
    return(
        <div>
            <button onClick={async ()=>await logOut()}>
                Salir de la cuenta
            </button>
            <Filtros/>
            <ListaHabitaciones/>
        </div>
    )
}