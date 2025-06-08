import React from 'react';

interface ExamNotification {
  id: string;
  materia: string;
  fecha: string;
  hora: string;
  modalidad: string;
}

interface ExamNotificationCardProps {
  notification: ExamNotification;
  onConfirm: (id: number) => void;
  onReject: (id: number) => void;
}

const ExamNotificationCard: React.FC<ExamNotificationCardProps> = ({
  notification,
  onConfirm,
  onReject
}) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '15px', marginBottom: '10px' }}>
      <h3>{notification.materia}</h3>
      <p><strong>Hora:</strong> {notification.hora}</p>
      <p><strong>Fecha:</strong> {notification.fecha}</p>
      <p><strong>Modalidad:</strong> {notification.modalidad}</p>
      <button
        onClick={() => onReject(Number(notification.id))}
        style={{
          backgroundColor: 'red',
          color: 'white',
          padding: '8px 15px',
          marginRight: '10px',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        Rechazar
      </button>
      <button
        onClick={() => onConfirm(Number(notification.id))}
        style={{
          backgroundColor: 'green',
          color: 'white',
          padding: '8px 15px',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        Confirmar
      </button>
    </div>
  );
};

export default ExamNotificationCard;
