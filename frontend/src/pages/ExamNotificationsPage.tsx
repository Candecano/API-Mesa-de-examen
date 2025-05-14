import React, { useState, useEffect } from 'react';
import ExamNotificationCard from '../componentes/ExamNotificationCard';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import useAuth from '../hooks/useAuth'; // Importa useAuth

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

 
const navigate = useNavigate();

const handleLogout = () => {
  logout();            
};

// En el JSX:
  const handleLogoutClick = () => {
    handleLogout();
    navigate('/'); // Redirige a la página de inicio de sesión
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Notificaciones de Mesas de Examen</h2>
   <button onClick={() => alert('Te has suscrito a las notificaciones')}>Suscribirse a Notificaciones</button>
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
