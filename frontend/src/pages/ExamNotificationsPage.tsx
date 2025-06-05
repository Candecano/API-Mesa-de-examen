import React, { useState, useEffect } from 'react';
import ExamNotificationCard from '../componentes/ExamNotificationCard';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/AuthContext';
import { obtenerMesas, confirmarMesa, rechazarMesa, Mesa } from '../api/mesas';

const ExamNotificationsPage: React.FC = () => {
  const [notificaciones, setNotificaciones] = useState<Mesa[]>([]);
  const { logout, username, idProfesor } = useAuth(); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMesas = async () => {
      try {
        if (!idProfesor) return;
        const mesas = await obtenerMesas(idProfesor);
        setNotificaciones(mesas);
      } catch (error) {
        console.error("Error al obtener mesas", error);
      }
    };

    fetchMesas();
  }, [idProfesor]);

  const handleConfirm = async (id: number) => {
    try {
      await confirmarMesa(id);
      setNotificaciones(prev => prev.filter(n => n.idMesa !== id));
      alert("Asistencia registrada correctamente");
    } catch {
      alert("Error al registrar asistencia");
    }
  };

  const handleReject = async (id: number) => {
    try {
      await rechazarMesa(id);
      setNotificaciones(prev => prev.filter(n => n.idMesa !== id));
      alert("Inasistencia registrada correctamente");
    } catch {
      alert("Error al registrar inasistencia");
    }
  };

  const handleLogoutClick = () => {
    const confirmar = window.confirm('¿Seguro que querés cerrar sesión?');
    if (confirmar) {
      logout();
      navigate('/');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Notificaciones de Mesas de Examen</h2>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div>👋 Hola, {username}</div>
        <button onClick={handleLogoutClick}>Cerrar sesión</button>
      </div>

      <button onClick={() => alert('Te has suscrito a las notificaciones')}>
        Suscribirse a Notificaciones
      </button>

      {notificaciones.length === 0 ? (
        <p>No hay mesas asignadas.</p>
      ) : (
        notificaciones.map(n => (
          <ExamNotificationCard
            key={n.idMesa}
            notification={{
              id: n.idMesa.toString(),
              materia: n.Materia,
              fecha: new Date(n.fecha).toISOString().split("T")[0],
              hora: new Date(n.fecha).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              ubicacion: `Aula ${n.idMesa}`
            }}
            onConfirm={() => handleConfirm(n.idMesa)}
            onReject={() => handleReject(n.idMesa)}
          />
        ))
      )}
    </div>
  );
};

export default ExamNotificationsPage;
