import { useSignOut } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom"
import { auth } from "../../config/firebase";

export const Admin = () => {
    const [logOut] = useSignOut(auth);
    return (
        <>
            <button onClick={async ()=>await logOut()}>
                Salir de la Cuenta
            </button>
            <Link to={"inventario"} relative="path">
                <button>
                    inventario
                </button>
            </Link>
            <Link to={"habitaciones"} relative="path">
                <button>
                    habitaciones
                </button>
            </Link>
            <Link to={"control_de_ingresos"} relative="path">
                <button>
                    control de ingresos
                </button>
            </Link>
        </>
    )
}