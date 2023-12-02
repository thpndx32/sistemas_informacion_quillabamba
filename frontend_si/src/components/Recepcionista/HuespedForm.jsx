import { Box, Button, FormControl, Modal } from "@mui/material";
import { addDoc, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestore } from "../../config/firebase";
import { DateRange } from "../DateRange";
import dayjs from "dayjs";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function formatDate(date) {
console.log("here",date);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
}

export const HuespedForm = (
    {show,handleClose,tipoHab,numHab, handleCliente, precio}
) =>{
    const [auxArray,setAuxArray] = useState([]);
    const [formData, setFormData] = useState([]);
    const [fechasjs, setFechasjs] = useState([
        dayjs(),
        dayjs(),
      ]);
    const [fechas, setFechas] = useState([]);
    useEffect(()=>{
        //console.log("here");
        //console.log(fechasjs);
        let newArr = [];
        fechasjs.forEach((e,index)=>{
            newArr[index] = e;
        })
        //console.log(newArr);
        setFechas(newArr);
    },[fechasjs])
    const handleChange = (index, field, value) => {
        const newData = [...formData];
        if (!newData[index]) {
            newData[index] = {}; // Inicializa un nuevo objeto para la fila si no existe
        }
        newData[index][field] = value;
        setFormData(newData);
    };
    useEffect(() => {
        if(tipoHab==="simple")setAuxArray(Array(1).fill(0));
        else if (tipoHab==="cuadruple"||tipoHab==="matrimonial con doble adicional") setAuxArray(Array(4).fill(0));
        else if (tipoHab==="triple"||tipoHab==="matrimonial con adicional") setAuxArray(Array(3).fill(0));
        else setAuxArray( Array(2).fill(0));
    },[tipoHab])
    const handleCrearFicha=async()=>{
        const validRows = formData.filter((data) => data.nombre && data.dni && data.dni.length === 8);
        // Ahora, verifica que al menos una fila esté completamente llena
        const completeRows = formData.filter((data) => data.telefono);
        console.log("fechas 0",fechas[0].add(1,'day'));
        const daysDifference = Math.ceil((fechas[1] - fechas[0]) / (1000 * 60 * 60 * 24)+1);
        const daysToPay = {};
        for (let i = 0; i < daysDifference; i++) {
            daysToPay[formatDate(fechas[0].add(i,'day').$d)]={
                Cantidad: 1,
                Costo: precio,
                Recibo: '',
            };
        }
        if (completeRows.length > 0) {
            //console.log("Se ha llenado al menos una fila completamente.");
            const docuRef = await addDoc(collection(firestore,'fichas'),{
                Huespedes: validRows,
                Numero_Habitacion: numHab,
                Inicio_Estadia: fechas[0].toDate(),
                Final_Estadia: [fechas[1].toDate()],
                Activo: true,
                Contenido: daysToPay,
            });
            handleCliente(docuRef.id);
            //console.log("ficha", docuRef.id);
        } else {
            // Ninguna fila está completamente llena
            //console.log("Ninguna fila está completamente llena.");
            // Puedes mostrar un mensaje de error o realizar alguna otra acción aquí.
        }
        if (validRows.length > 0) {
            // Al menos una fila está completamente llena, puedes continuar con el proceso
            //console.log(validRows.length, "numero de filas validas");
            // También puedes acceder a los datos completos en validRows.
        } else {
            // Ninguna fila está completamente llena
            //console.log("Ninguna fila es valida.");
            // Puedes mostrar un mensaje de error o realizar alguna otra acción aquí.
        }
    }
    return(
        <Modal 
            open={show}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
            <FormControl defaultValue="" required>
                <label>Datos Clientes</label>
                {auxArray.map((_, index) => (
                    <div key={index}>
                    <label>{`Cliente ${index + 1}`}</label>
                    <input
                        type="text"
                        placeholder="Nombre"
                        value={formData[index]?.nombre || ''}
                        onChange={(e) => {
                            const nombreValue = e.target.value;
                            
                            // Verifica si el valor contiene solo letras
                            if (/^[A-Za-z\s]*$/.test(nombreValue)) {
                              // Si es válido, actualiza el estado
                              handleChange(index, 'nombre', nombreValue);
                            }
                            }
                        }
                    />
                    <input
                        type="text"
                        placeholder="DNI"
                        value={formData[index]?.dni || ''}
                        onChange={(e) => {
                            const dniVal = e.target.value;
                            if (dniVal.length<=8&&/^[0-9]*$/.test(dniVal)) handleChange(index, 'dni', e.target.value)
                        }}
                    />
                    <input
                        type="text"
                        placeholder="Telefono"
                        value={formData[index]?.telefono || ''}
                        onChange={(e) =>{ 
                            const telefonoVal = e.target.value;
                            if(/^[0-9]*$/.test(telefonoVal))handleChange(index, 'telefono', e.target.value)
                        }}
                    />
                    </div>
                ))}
                <DateRange value={fechasjs} setValue={setFechasjs}/>
                <Button onClick={handleCrearFicha}>{"Registrar Huesped(es)"}</Button>
                </FormControl>
            </Box>
        </Modal>
    )
}