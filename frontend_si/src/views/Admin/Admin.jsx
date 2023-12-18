import { useSignOut } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom"
import { auth } from "../../config/firebase";
import { AdminDiv, General, OpcionesAdmin, Salir } from "../../styles/General";
import { Header } from "../../styles/Header";

export const Admin = () => {
    const [logOut] = useSignOut(auth);
    return (
        <General>
            <Header>
            <Salir onClick={async ()=>await logOut()}>
                Cerrar Sesión
            </Salir>
            </Header>
            <AdminDiv>
                <Link to={"inventario"} relative="path">
                    <OpcionesAdmin>
                        inventario
                    </OpcionesAdmin>
                </Link>
                <Link to={"habitaciones"} relative="path">
                    <OpcionesAdmin>
                        habitaciones
                    </OpcionesAdmin>
                </Link>
                <Link to={"control_de_ingresos"} relative="path">
                    <OpcionesAdmin>
                        control de ingresos
                    </OpcionesAdmin>
                </Link>
            </AdminDiv>
        </General>
    )
}