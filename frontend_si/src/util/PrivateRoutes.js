import {Navigate, Outlet} from 'react-router-dom'
import { useContext } from 'react';
import { AuthContext } from '../views/AppQuillabamba';
export const PrivateRoutes = (
    {usrType, prevPage}
) => {
    const [usr,data, loadingData] = useContext(AuthContext);
    //console.log("data",data?.docs);
    //console.log("loading data",loadingData);
    //console.log("usrType",usrType);
    return(
        !loadingData&&((usr&&(!usrType||usrType===data?.docs[0].data()?.rol)) ? <Outlet/> : <Navigate to={
            `/${prevPage&&usrType?data?.docs[0].data()?.rol:""}`
        }/>)
    )
}