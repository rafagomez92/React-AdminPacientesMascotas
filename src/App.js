import React, { useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import Cita from './components/Cita';

function App() {

  // Ciltas en localstorage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if(!citasIniciales) {
    citasIniciales = [];
  }

  // Arreglo de citas
  const [citas, guardarCitas] = useState(citasIniciales);

  useEffect(() => {
    if(citasIniciales) {
      localStorage.setItem('citas', JSON.stringify(citas));
    } else {
      localStorage.setItem('citas', JSON.stringify([]));
    }
  }, [citas, citasIniciales]);


  // Función que elimina una cita por su id
  const eliminarCita = id => {
    const nuevasCitas = citas.filter(cita => cita.id !== id);
    guardarCitas(nuevasCitas);
  }

  // Funcion que tome las citas actuales y agregue la nueva
  const crearCita = cita => {
    guardarCitas([
      ...citas,
      cita
    ]);
  }

  const titulo = citas.length === 0 ? 'No hay citas' : 'Administra tu citas';
  
  return (    
    <>    
     <h1>Administrador de pacientes</h1>    
     <div className="container">
       <div className="row">
        <div className="one-half column">
          <Formulario crearCita={ crearCita } />
        </div>    
        <div className="one-half column">
          <h2>{titulo}</h2>
          {citas.map(cita => (
            <Cita
              key={ cita.id }
              cita={ cita }
              eliminarCita={ eliminarCita }
            />
          ))}
        </div>    
       </div>
       
     </div>
    </>
  );
}

export default App;
