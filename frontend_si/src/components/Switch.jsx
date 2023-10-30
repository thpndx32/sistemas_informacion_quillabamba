import { useEffect, useState } from "react"

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
    <label className="toggles-slider" htmlFor="switchRoles">
        {Toggled===true?"recepcionista":"admin"}
        <input type="checkbox"  checked={Toggled} onChange={toggleSwitch} id="switchRoles"/>
    </label>
  )
}