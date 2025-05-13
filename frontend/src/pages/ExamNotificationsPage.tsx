import React, { useState, useEffect } from 'react';
import ExamNotificationCard from '../componentes/ExamNotificationCard';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import ProfilePage from '../componentes/Auth/ProfilePage';

interface ExamNotification {
  materia: string;
  hora: string;
  fecha: string;
  ubicacion: string;
  id: string;
}

const ExamNotificationsPage: React.FC = () => {
  console.log('¡ExamNotificationsPage se ha renderizado!');
  const [notifications, setNotifications] = useState<ExamNotification[]>([]);
  const navigate = useNavigate();
  const { isAuthenticated, username } = useAuth();

 useEffect(() => {
  console.log('isAuthenticated en ExamNotificationsPage:', isAuthenticated);
  if (!isAuthenticated) {
    navigate('/');
  } else {
      // Aquí iría la lógica para obtener las notificaciones del backend
      // Simulación de datos
      setNotifications([
        { id: '1', materia: 'Matemáticas I', hora: '10:00', fecha: '2025-06-15', ubicacion: 'Aula Magna' },
        { id: '2', materia: 'Física II', hora: '14:30', fecha: '2025-06-18', ubicacion: 'Laboratorio 1' },
        { id: '3', materia: 'Química General', hora: '09:00', fecha: '2025-06-22', ubicacion: 'Aula 102' },
      ]);
    }
  }, [isAuthenticated, navigate]);

  const handleConfirm = (id: string) => {
    console.log(`Examen con ID ${id} confirmado`);
    // Aquí iría la lógica para enviar la confirmación al backend
    // Actualizar la lista localmente (opcional)
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const handleReject = (id: string) => {
    console.log(`Examen con ID ${id} rechazado`);
    // Aquí iría la lógica para enviar el rechazo al backend
    // Actualizar la lista localmente (opcional)
    setNotifications(notifications.filter(n => n.id !== id));
  };

  if (!isAuthenticated) {
    return null; // O un mensaje de carga si prefieres
  }

  return (
    <div>
      <ProfilePage username={username} />
      <h2>Notificaciones de Mesas de Examen Final</h2>
      {notifications.length > 0 ? (
        notifications.map((notification) => (
          <ExamNotificationCard
            key={notification.id}
            notification={notification}
            onConfirm={handleConfirm}
            onReject={handleReject}
          />
        ))
      ) : (
        <p>No hay notificaciones de mesas de examen.</p>
      )}
    </div>
  );
};

export default ExamNotificationsPage;