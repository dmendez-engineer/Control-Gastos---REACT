import React from 'react'
import Gasto from './Gasto'

const ListadoGastos = ({gastos,gastoEditar,setGastoEditar,
    eliminarGasto,filtro,gastosFiltrados}) => {
  
        
    return (
    <div className='listado-gastos contenedor'>
        <h2>{gastos.length?"Gastos":'No hay gastos'}</h2>

        {gastos.map(gasto=>{
            return <Gasto
            key={gasto.id}
            gasto={gasto}
            gastoEditar={gastoEditar}
            setGastoEditar={setGastoEditar}
            eliminarGasto={eliminarGasto}
            />
        })}

    </div>
  )
}

export default ListadoGastos