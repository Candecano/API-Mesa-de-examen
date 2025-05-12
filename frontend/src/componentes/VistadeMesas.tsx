/*import React, { useState, useEffect } from 'react';

interface MesaInfo {
  idMesa: string;
  materia: string;
  fecha: string;
  hora: string;
  aula: string;
  modalidad: string;
  profesor: string;
}

const MesaExamen: React.FC = () => {
  const [respuesta, setRespuesta] = useState<string | null>(null);
  const [estado, setEstado] = useState<string>('Pendiente');

   fetch('http://localhost:3000/api/mesa/mesa')
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
     .catch(error => {
      console.error('Hubo un error:', error);
  });


  const confirmarAsistencia = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/mesa/confirmar', {

       });
      if (response.ok) {
        setRespuesta('Confirmada');
        setEstado('Confirmada');
      }
    } catch (error) {
      console.error('Error al confirmar asistencia:', error);
    }
  };

  const rechazarAsistencia = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/mesa/rechazar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idProfesor: mesa.profesor, idMesa: mesa.idMesa }),
      });
      if (response.ok) {
        setRespuesta('Rechazada');
        setEstado('Rechazada');
      }
    } catch (error) {
      console.error('Error al rechazar asistencia:', error);
    }
  };

  const obtenerRespuesta = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/mesa/respuesta?idProfesor=${mesa.profesor}&idMesa=${mesa.idMesa}`
      );
      if (response.ok) {
        const data = await response.json();
        if (data.respuesta === true) {
          setEstado('Confirmada');
        } else if (data.respuesta === false) {
          setEstado('Rechazada');
        } else {
          setEstado('Pendiente');
        }
      }
    } catch (error) {
      console.error('Error al obtener respuesta:', error);
    }
  };

  useEffect(() => {
    obtenerRespuesta();
  }, []);

  return (
    <div>
      <h2>Mesa de Examen</h2>
      <p><strong>Materia:</strong> {mesa.materia}</p>
      <p><strong>Fecha:</strong> {mesa.fecha}</p>
      <p><strong>Hora:</strong> {mesa.hora}</p>
      <p><strong>Aula:</strong> {mesa.aula}</p>
      <p><strong>Modalidad:</strong> {mesa.modalidad}</p>
      <p><strong>Profesor:</strong> {mesa.profesor}</p>
      <p><strong>Estado:</strong> {estado}</p>
      <button onClick={confirmarAsistencia}>Confirmar Asistencia</button>
      <button onClick={rechazarAsistencia}>Rechazar Asistencia</button>
    </div>
  );
};

export default MesaExamen;*/