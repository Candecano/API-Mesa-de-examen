import React, { useState, useEffect } from 'react';
import ExamNotificationCard from '../componentes/ExamNotificationCard';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/AuthContext'; // Asegurate de usar el contexto nuevo

interface ExamNotification {
  id: string;
  materia: string;
  fecha: string;
  hora: string;
  ubicacion: string;
}

const ExamNotificationsPage: React.FC = () => {
  const [notificaciones, setNotificaciones] = useState<ExamNotification[]>([]);
  const { logout, username } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Simulación de datos
    const datos = [
      {
        id: '1',
        materia: 'Matemática',
        fecha: '2025-06-01',
        hora: '10:00',
        ubicacion: 'Aula 101',
      },
      {
        id: '2',
        materia: 'Física',
        fecha: '2025-06-02',
        hora: '14:00',
        ubicacion: 'Aula 202',
      },
      {
        id: '3',
        materia: 'Programación',
        fecha: '2025-06-03',
        hora: '08:00',
        ubicacion: 'Aula 303',
      },
    ];
    setNotificaciones(datos);
  }, []);

  const handleConfirm = (id: string) => {
    alert(`Confirmaste la mesa con ID ${id}`);
  };

  const handleReject = (id: string) => {
    alert(`Rechazaste la mesa con ID ${id}`);
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

      {notificaciones.map((n) => (
        <ExamNotificationCard
          key={n.id}
          notification={n}
          onConfirm={handleConfirm}
          onReject={handleReject}
        />
      ))}
    </div>
  );
};

export default ExamNotificationsPage;