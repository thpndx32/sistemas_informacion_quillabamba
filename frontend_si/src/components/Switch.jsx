import { useEffect, useState } from "react"
import { SwitchStyle } from "../styles/Login";

export const Switch = (
 {variable}
) => {
    const [Toggled, setToggled] = useState(false);
    const toggleSwitch = () =>{
        setToggled(!Toggled);
    };

    useEffect(() => {
    	variable();
        //console.log(variable);
     }, [Toggled]);
  return (
    <SwitchStyle className="toggles-slider" htmlFor="switchRoles">
        {Toggled===true?"recepcionista":"admin"}
        <input type="checkbox"  checked={Toggled} onChange={toggleSwitch} id="switchRoles"/>
    </SwitchStyle>
  )
}