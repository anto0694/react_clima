import React, {useState} from 'react';
import Error from './Error';
import PropTypes from 'prop-types';


const Formulario = ({busqueda,guardarBusqueda,guardarConsulta}) => {


// State para errores
const [error, guardarError]= useState(false);
    //Extraer datos
    const {ciudad,pais}= busqueda;

//Funcion que actualiza el state
const handledChange = e =>{
guardarBusqueda({
    ...busqueda,
    [e.target.name]:e.target.value
});

}
// validar formulario cuando haga submit
const handledSubmit = e =>{
    e.preventDefault();

if (ciudad.trim()===''|| pais.trim()===''){
    guardarError(true);
    return;
}
    guardarError(false);

    //Pasar informacion al componente ppal
    guardarConsulta(true);   

}

    return (
        <form
        onSubmit={handledSubmit}>
           {error ? <Error mensaje="Todos los cmapos son obligatorios"/>:null}
            <div className="input-field col s12">

                    <input
                        type="text"
                        name="ciudad"
                        id="ciudad"
                        value={ciudad}
                        onChange={handledChange}>   
                             
                    </input>
                    <label htmlFor="ciudad">Ciudad: </label>
            </div>

            <div className="input-field col s12">
                    <select
                        name="pais"
                        id="pais"
                        value={pais}
                        onChange={handledChange}>        
                            <option value="">--Seleccione pais--</option>
                            <option value="US">Estados Unidos</option>
                            <option value="MX">México</option>
                            <option value="AR">Argentina</option>
                            <option value="CO">Colombia</option>
                            <option value="CR">Costa Rica</option>
                            <option value="ES">España</option>
                            <option value="PE">Perú</option>
                    </select>
                    <label htmlFor="pais">Pais: </label>
                    

                 
            </div>
            <div className="input-field col s12">
                    <input className="waves-effect waves-light btn-large btn-block yellow accent-4 "type="submit" value="Consultar clima"></input>
            </div>
        </form>
      );
}
Formulario.propTypes = {
    busqueda : PropTypes.object.isRequired,
    guardarBusqueda : PropTypes.func.isRequired,
    guardarConsulta : PropTypes.func.isRequired,
}
export default Formulario;