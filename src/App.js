import React,{Fragment, useState,useEffect} from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Clima from './components/Clima';
import Error from './components/Error';




function App() {

  //State ppal
  const [busqueda, guardarBusqueda]=useState({
    ciudad:'',
    pais:''
});

//Extraer datos
    const {ciudad,pais}= busqueda;

//State consulta

const [consulta,guardarConsulta]=useState(false); // de esta manera no por cada vez que haya un cambio en los input se hara el llamado a la api

//state para resultado de la consulta(la pi nos devuelve un objeto )

const[resultado,guardarResultado]=useState({});
//state para el manejo de las ciudad que no se encuentran

const[error,guardarError]=useState(false);


useEffect(()=>{
const consultarAPI = async()=>{
if (consulta){
  const apiId='d4b87c263ece57bffea7ec48e5031357';
  const url= `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${apiId}`
  const respuesta = await fetch(url);
  const resultado = await respuesta.json();
 
  guardarResultado(resultado);
  guardarConsulta(false);
  // detectar si hubieron resultados correctos en la consulta
  if(resultado.cod === "404"){
    guardarError(true);
  }else{
    guardarError(false);}
}
}
consultarAPI();
// eslint-disable-next-line
},[consulta]);

//cargar condicionalmente un componente
let componente;
if(error){
  componente= <Error mensaje ="No hay resultados"/>
}else{ 
componente= <Clima resultado={resultado}/>}

  return (
    <Fragment>
      <Header
      titulo='Clima react App'></Header>
      <div className="contenedor-form">
           <div className ="row">
                <div className="col m6 s12">
                <Formulario 
                busqueda={busqueda}
                guardarBusqueda={guardarBusqueda}
                guardarConsulta={guardarConsulta}
                />
                </div>
                <div className="col m6 s12">
                {componente}
                </div>
      </div>

      </div>
    </Fragment>


  );
}

export default App;
