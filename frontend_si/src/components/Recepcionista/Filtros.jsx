import { useEffect, useState } from "react";
import TuneIcon from '@mui/icons-material/Tune';
import { Box, FormControl, IconButton, InputLabel, MenuItem, Select } from "@mui/material";
import { FormFiltros } from "./FormFiltros";
import { collection, query, where } from "firebase/firestore";
import { firestore } from "../../config/firebase";
import { InputFiltro } from "../Filtros/InputFiltro";



export const Filtros = ({
    setFilteredQuery,setInitialQuery, initialQuery, q, path
}) => {
    const [filtro, setFiltro] = useState("");
    const [sizeFilters, setSizeFilters] = useState(0);
    const [filters, setFilters] = useState([]);
    const [copyFilters, setCopyFilters] = useState([...filters]);
    const [filteredQueries, setFilteredQueries] = useState([]);
    const [operacionComparacion, setOperacionComparacion] = useState("==");
    const [valorFiltro, setValorFiltro] =useState("");
    useEffect(()=>{
        if(filters.length>0){
            setFilteredQuery(filteredQueries);
            if (initialQuery) setInitialQuery(false);
        }else {
            setFilteredQuery([q]);
        }
    },[filteredQueries])
    useEffect(()=>{
        console.log("filtros",filters);
        const erasedIndex= filters.findIndex((element,index)=>JSON.stringify(element)!==JSON.stringify(copyFilters[index]));
        if (filters.length !== sizeFilters){
            setSizeFilters(filters.length);
            setCopyFilters(filters);
        }
        console.log("here before set Queries");
        if(filters.length > sizeFilters) {
            const lastIndex = filters.length - 1;
            const filteredQ = query(collection(firestore,path),
            where("activa","==", true), where(filters[lastIndex].field,filters[lastIndex].operacion, filters[lastIndex].value))
            setFilteredQueries([...filteredQueries,filteredQ]);
        } else {
            let localCopyArray = filteredQueries;
            localCopyArray.splice(erasedIndex, 1);
            setFilteredQueries([...localCopyArray]);
        }
    },[filters])
    const handleAddFiltro = ( value) => {
        const filterIndex = filters.findIndex(filter => 
            filter.field === filtro
        );
        if (filterIndex !== -1) {
            const updatedFilters = [...filters];
            updatedFilters[filterIndex].value = value;
            setFilters([...updatedFilters]);
        } else {
            const objeto = { field:filtro, value:value, operacion:operacionComparacion };
            setFilters([...filters, objeto]);
            console.log("objeto", [...filters, objeto]);
        }
        console.log("filtro added");
    };
    const handleFiltro = (e) =>{
        setFiltro(e.target.value);
    }
    return (
        <div>        
            <Box sx={{ maxWidth: 200 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Filtros</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={filtro}
                    label="Age"
                    onChange={handleFiltro}
                    >
                    <MenuItem value={"precio"}>Precio</MenuItem>
                    <MenuItem value={"Numero_Habitacion"}>Numero Habitacion</MenuItem>
                    <MenuItem value={"estado"}>Estado Habitacion</MenuItem>
                    <MenuItem value={"tipo"}>Tipo Habitacion</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            {filtro&&<InputFiltro Filtro={filtro} setOperacion={setOperacionComparacion} Operacion={operacionComparacion} 
                setValorFiltro={setValorFiltro} valorFiltro={valorFiltro} handleAddFiltro={handleAddFiltro}/>}
                <div>
                    {
                        filters.map((filtro,index)=>{
                            return (
                                <p key={index}>
                                    {filtro.field}
                                    {filtro.operacion}
                                    {filtro.value}
                                </p>
                            )
                        })
                    }
                </div>
        </div>
    );
}