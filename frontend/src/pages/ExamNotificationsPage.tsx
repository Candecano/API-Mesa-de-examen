import React, { useState, useEffect } from 'react';
import ExamNotificationCard from '../componentes/ExamNotificationCard';

interface ExamNotification {
  id: string;
  materia: string;
  fecha: string;
  hora: string;
  ubicacion: string;
}

const ExamNotificationsPage: React.FC = () => {
  const [notificaciones, setNotificaciones] = useState<ExamNotification[]>([]);

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

  return (
    <div style={{ padding: '20px' }}>
      <h2>Notificaciones de Mesas de Examen</h2>
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
