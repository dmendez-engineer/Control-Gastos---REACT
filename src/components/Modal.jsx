import React, { useEffect } from 'react'
import {useState} from 'react'
import { generarId } from '../helpers'
import CerrarBtn from '../img/cerrar.svg'
import Mensaje from './Mensaje'

const Modal = ({setModal,animarModal,setAnimarModal,guardarGasto,gastoEditar,setGastoEditar}) => {
  

    const [nombre,setNombre]=useState('');
    const [cantidad,setCantidad]=useState(0);
    const [categoria,setCategoria]=useState('');
    const [mensaje,setMensaje]=useState('');
    const [id,setId]=useState('');
    const [fecha,setFecha]=useState('');


    
    useEffect(()=>{
        console.log(gastoEditar);
        if(Object.keys(gastoEditar).length>0){
            setNombre(gastoEditar.nombre);
            setCantidad(gastoEditar.cantidad);
            setCategoria(gastoEditar.categoria);
            setId(gastoEditar.id);
            setFecha(gastoEditar.fecha);
        }
    },[]);

    const handleCerrarBtn=()=>{
        setGastoEditar({});
        setAnimarModal(false);

        setTimeout(()=>{
            setModal(false);
          },500);

    }
    const handleGastoNuevo=(e)=>{
        e.preventDefault();
       
        if([nombre,cantidad,categoria].includes('')){
            //Falla la validacion
            setMensaje('Todos los campos son obligatorios');

            setTimeout(() => {
                setMensaje('');
            }, 1500);
            return;
        }
        else{
            
            guardarGasto({nombre,cantidad,categoria,id,fecha});
        }
    }

    return (
    <div className='modal'>
        <div className='cerrar-modal'>
            <img
            src={CerrarBtn}
            alt="Cerrar Modal"
            onClick={handleCerrarBtn}
            />
        </div>

        <form 
        onSubmit={handleGastoNuevo}
        className={`formulario ${animarModal ? 'animar' : 'cerrar'}`}>
            <legend>{Object.keys(gastoEditar).length>0 ? "Editar Gasto": "Nuevo Gasto"}</legend>
            {mensaje &&
                <Mensaje
                tipo={"error"}
                >
                    <p>{mensaje}</p>
                </Mensaje>
                }
            <div className='campo'>
                <label htmlFor='nombre'>Nombre gasto</label>

                <input type="text" placeholder='Añade el nombre del gasto'
                id="nombre"
                value={nombre}
                onChange={(e)=>setNombre(e.target.value)}
                />
            </div>
                
            <div className='campo'>
            <label htmlFor='cantidad'>Cantidad</label>

            <input type="text" placeholder='Añade la cantidad del gasto ej. 300'
            id="cantidad"
            value={cantidad}
            onChange={(e)=>setCantidad(Number(e.target.value))}
            />
        </div>

        <div className='campo'>
            <label htmlFor='categoria'>Categoria</label>

            <select type="text" placeholder='Añade la cantidad del gasto ej. 300'
            id="categoria"
            value={categoria}
            onChange={(e)=>setCategoria(e.target.value)}
            >
                <option value="">---Seleccione---</option>
                <option value="ahorro">Ahorro</option>
                <option value="comida">Comida</option>
                <option value="casa">Casa</option>
                <option value="gastos">Gastos varios</option>
                <option value="esparcimiento">Esparcimiento</option>
                <option value="salud">Salud</option>
                <option value="suscripciones">Suscripciones</option>
            </select>
            
        </div>

        <input type="submit" value={Object.keys(gastoEditar).length>0 ? "Editar Gasto": "Añadir Gasto"}/>
        
        </form>
    </div>
  )
}

export default Modal