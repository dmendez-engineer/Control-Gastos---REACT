import React from 'react'
import {useState} from 'react'
const Filtros = ({setFiltro,filtro}) => {
  
  const[categoriaSeleccionada,setCategoriaSeleccionada]=useState('');
  
 /* const handleSubmit=()=>{
    setFiltro(categoriaSeleccionada);
  }*/

  return (
    <div className='filtros sombra contenedor'>
     
            <div className='campo'>
            <label>Filtrar campo</label>
            <select type="text" placeholder='Añade la cantidad del gasto ej. 300'
              id="categoria"
              value={filtro}
              onChange={(e)=>setFiltro(e.target.value)}
              >
                  <option value="">Todos</option>
                  <option value="ahorro">Ahorro</option>
                  <option value="comida">Comida</option>
                  <option value="casa">Casa</option>
                  <option value="gastos">Gastos varios</option>
                  <option value="esparcimiento">Esparcimiento</option>
                  <option value="salud">Salud</option>
                  <option value="suscripciones">Suscripciones</option>
            </select>
            </div>
            
      
    </div>
  )
}

export default Filtros