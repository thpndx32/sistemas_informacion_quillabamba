import { useEffect, useState } from "react";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { collection, query, where } from "firebase/firestore";
import { firestore } from "../../config/firebase";
import { InputFiltro } from "./InputFiltro";
import { FiltrosFila } from "./FiltrosFila";



export const Filtros = ({
    setFilteredQuery,setInitialQuery, initialQuery, q, path
}) => {
    const [filtro, setFiltro] = useState("");
    const [sizeFilters, setSizeFilters] = useState(0);
    const [filters, setFilters] = useState([]);
    const [filteredQueries, setFilteredQueries] = useState([]);
    const [operacionComparacion, setOperacionComparacion] = useState("==");
    const [valorFiltro, setValorFiltro] =useState("");
    const [indexMod, setIndexMod] = useState(-1);
    const [erasedIndex, setErasedIndex] = useState(-1);
    useEffect(()=>{
        if(filters.length>0){
            if (initialQuery) {
                console.log("false");
                setInitialQuery(false);
            }
        }else {
            if (!initialQuery) {
                console.log("true");
                setInitialQuery(true);
                setIndexMod(-1);
            }
        }
    },[JSON.stringify(filters),filters.length,initialQuery])
    useEffect(()=>{
        if(filters.length>0){
            console.log("not q");
            console.log("filteredQueries",filteredQueries);
            console.log("filteredQueries element",filteredQueries[0]);
            setFilteredQuery([...filteredQueries]);
        }else {
            console.log("q");
            setFilteredQuery([q]);
        }
    },[JSON.stringify(filteredQueries),filteredQueries.length,initialQuery])
    useEffect(()=>{
        //console.log("filtros",filters);
        if (filters.length !== sizeFilters){
            //console.log(filters.length);
            setSizeFilters(filters.length);
        }
        //console.log("here before set Queries");
        if(filters.length > sizeFilters) {
            console.log("HERE >");
            const lastIndex = filters.length - 1;
            const filteredQ = query(collection(firestore,path),
            where("activa","==", true), where(filters[lastIndex].field,filters[lastIndex].operacion, filters[lastIndex].value));
            setFilteredQueries([...filteredQueries,filteredQ]);
        }else if(filters.length === sizeFilters && !initialQuery){
            console.log("HERE ==");
            let localCopyArray = filteredQueries;
            console.log("filteredQ",indexMod);
            const filteredQ = query(collection(firestore,path),
            where("activa","==", true), where(filters[indexMod]?.field,filters[indexMod]?.operacion, filters[indexMod]?.value));
            localCopyArray[indexMod] = filteredQ;
            console.log("filteredQ",filteredQ);
            setFilteredQueries([...localCopyArray]);
        }else {
            //console.log("HERE <");
            let localCopyArray = filteredQueries;
            //console.log("local copy Array before", localCopyArray)
            localCopyArray.splice(erasedIndex, 1);
            //console.log("local copy Array after", localCopyArray)
            setFilteredQueries([...localCopyArray]);
        }
    },[filters,erasedIndex,filteredQueries.length,indexMod,sizeFilters])
    const handleBorrar = (index) => {
        let copyFilters = filters;
        //console.log("index",index);
        copyFilters.splice(index,1);
        console.log("copyFilters",copyFilters);
        setErasedIndex(index);
        setFilters([...copyFilters]);
    }
    const handleAddFiltro = (value) => {
        console.log("filtro",filtro);
        console.log("filtros",filters);
        const filterIndex = filters.findIndex(filter => 
            filter.field === filtro
        );
        if (filterIndex !== -1) {
            let updatedFilters = [...filters];
            updatedFilters[filterIndex].value = value;
            updatedFilters[filterIndex].operacion = operacionComparacion;
            console.log("updatedFilters",updatedFilters);
            setFilters([...updatedFilters]);
            setIndexMod(filterIndex);
        } else {
            const objeto = { field:filtro, value:value, operacion:operacionComparacion };
            setFilters([...filters, objeto]);
            setIndexMod(filters.length);
            console.log("objeto", [...filters, objeto]);
        }
        console.log("filter index", filterIndex);
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
                            <FiltrosFila filtro={filtro} index={index} handleBorrar={handleBorrar}/>
                        )
                    })
                }
            </div>
        </div>
    );
}