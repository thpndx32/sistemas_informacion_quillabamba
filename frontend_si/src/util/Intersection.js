export const Intersection = (arrays) => {
    
    //console.log("arrays intersecting", arrays);
    //console.log("arrays intersecting", arrays[0]);
    if (!arrays || arrays.length === 0) {
        //if (arrays.length[0])console.log("arrays HERE");
      return [];
    }
    // Inicializar la intersección con el primer array
    let interseccion = arrays[0];
    //console.log("interseccion",interseccion);
    let arrData = [];
    for (let i = 1; i < arrays.length; i++) {
        let arrDatai = [];
        for (let j = 0; j < arrays[i].length; j++){
            //console.log("element",arrays[i][j].data());
            arrDatai.push(JSON.stringify(arrays[i][j].data()));
        }
        arrData.push(arrDatai);
    }
    //console.log("arrData",arrData);
    // Iterar sobre los demás arrays
    for (let i = 0; i < arrData.length; i++) {
      // Filtrar los elementos que están presentes en ambos conjuntos
      interseccion = interseccion.filter(element => arrData[i].includes(JSON.stringify(element.data())));
      //console.log("interseccion",interseccion);
    }
  
    return interseccion;
  }