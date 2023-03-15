import { useState,useEffect } from 'react'
import Filtros from './components/Filtros';
import Header from './components/Header'
import ListadoGastos from './components/ListadoGastos';
import Modal from './components/Modal';
import { generarId } from './helpers';
import IconoNuevoGasto from './img/nuevo-gasto.svg'


function App() {
  
  const [presupuesto,setPresupuesto]=useState(
    localStorage.getItem('presupuesto') ?? 0
  );
  const[isValidPresupuesto,setIsValidPresupuesto]=useState(false);
  const [gastos,setGastos]=useState(
    JSON.parse(localStorage.getItem('gastos')??[])
  );
  const[modal,setModal]=useState(false);
  const[animarModal,setAnimarModal]=useState(false);
  const [gastoEditar,setGastoEditar]=useState({});
  const [filtro,setFiltro]=useState('');
  const [gastosFiltrados,setGastosFiltrados]=useState([]);
  useEffect(()=>{

    if(Object.keys(gastoEditar).length>0){
      //Tiene datos
      setModal(true);

    setTimeout(()=>{
      setAnimarModal(true);
    },500);

    }
    
  },[gastoEditar]);

  useEffect(()=>{
    localStorage.setItem('presupuesto',presupuesto ?? 0);
  },[presupuesto]);

  useEffect(()=>{
    const presupuestoLS=Number(localStorage.getItem('presupuesto')??0);

    if(presupuestoLS>0){
      setIsValidPresupuesto(true);
    }

  },[])

  useEffect(()=>{
    const gastosJSON=JSON.stringify(gastos);
    localStorage.setItem('gastos',gastosJSON??[]);
  },[gastos])
  
  useEffect(()=>{
    if(filtro){
      
      if(filtro==='Todos'){
        filtro='';
      }else{
        const gastosFiltrados=gastos.filter(gasto=>gasto.categoria===filtro);
        setGastosFiltrados(gastosFiltrados);
      }
      
    }
  },[filtro]);

  const handleNuevaGasto=()=>{
    setGastoEditar({});
    setModal(true);

    setTimeout(()=>{
      setAnimarModal(true);
    },500);
  }

  const guardarGasto=(gasto)=>{
    
    if(gasto.id){
      //Actualizar
      const nuevoArrayGastos=gastos.map(g=>g.id===gasto.id?gasto:g);
      setGastos(nuevoArrayGastos);
      setGastoEditar({});
    }else{
      //Nuevo gasto
    gasto.id=generarId();
    gasto.fecha=Date.now();
    setGastos([...gastos,gasto]);
    }
 
   
    setAnimarModal(false);
    setTimeout(() => {
      setModal(false);
    }, 500);
    
    
  }

  const eliminarGasto=(gasto)=>{
   // console.log("Gasto a Eliminar",gasto);
    const arregloActualizado=gastos.filter(g=>g.id!==gasto.id);
    setGastos(arregloActualizado);
  }

  return (
    <div className={modal ? 'fijar':''}>
      <Header
      gastos={gastos}
      setGastos={setGastos}
      presupuesto={presupuesto}
      setPresupuesto={setPresupuesto}
      isValidPresupuesto={isValidPresupuesto}
      setIsValidPresupuesto={setIsValidPresupuesto}
      
      />
     
      {isValidPresupuesto && (
        <div>  
           
        <main>
              <Filtros
              setFiltro={setFiltro}
              filtro={filtro}
              />
              <ListadoGastos
              gastoEditar={gastoEditar}
              gastos={filtro ? gastosFiltrados:gastos}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
              
              />
            </main>
            <div className="nuevo-gasto">
              <img 
              src={IconoNuevoGasto}
              alt="icono nuevo gasto"
              onClick={handleNuevaGasto}
              />
            </div>
        </div>
        )}
        {modal && <Modal
          animarModal={animarModal}
          setModal={setModal}
          setAnimarModal={setAnimarModal}
          guardarGasto={guardarGasto}
          gastoEditar={gastoEditar}
          setGastoEditar={setGastoEditar}
          
          />}

    </div>
  )
}

export default App
