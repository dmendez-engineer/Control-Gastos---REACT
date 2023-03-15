import React from 'react'
import { useEffect,useState } from 'react';
import {CircularProgressbar,buildStyles} from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css"

const ControlPresupuesto = ({presupuesto,gastos,setGastos,setPresupuesto,setIsValidPresupuesto}) => {
  
    const [disponible,setDisponible]=useState(0);
    const [gastado,setGastado]=useState(0);
    const [porcentaje,setPorcentaje]=useState(0);
    
    useEffect(()=>{
        
        const totalGastado=gastos.reduce((total,gasto)=>gasto.cantidad+total,0);
        const totaldisponible=presupuesto-totalGastado;
        setGastado(totalGastado);
        setDisponible(totaldisponible);
       

        setTimeout(() => {
            setPorcentaje((totalGastado/presupuesto*100).toFixed(2));
        },1500 );
        
    },[gastos]);

    
    const formatearCantidad=(cant)=>{
        return cant.toLocaleString('en-US',{
            style:'currency',
            currency:'USD'
        });
        
    }
    const handleResetApp=()=>{
        const resultado=confirm("Esta seguro de que quiere resetear la aplicacion?");

        if(resultado===true){
            setGastos({});
            setPresupuesto(0);
            setIsValidPresupuesto(false);
            
        }
    }

    return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
        <div>
            <p>
                <CircularProgressbar
                styles={buildStyles({
                    pathColor:disponible>0?'#3B82F6':'#FF0000',
                    trailColor:'#F5F5F5',
                    textColor:disponible>0?'#3B82F6':'#FF0000'
                })}
                value={porcentaje}
                text={porcentaje+"% Gastado"}
                />
            </p>
        </div>

        <div className='contenido-presupuesto'>
                <button className='reset-app'
                type='button'
                onClick={handleResetApp}
                >
                Resetear app
                </button>
            <p className={`${disponible <0 ?'negativo':''}`}>
                <span>Presupuesto: </span>{formatearCantidad(presupuesto)}
            </p>

            <p className={`${disponible <0 ?'negativo':''}`}>
                <span>Disponible: </span>{formatearCantidad(disponible)}
            </p>

            <p className={`${disponible <0 ?'negativo':''}`}>
                <span>Gastado: </span>{formatearCantidad(gastado)}
            </p>
        </div>
    </div>
  )
}

export default ControlPresupuesto