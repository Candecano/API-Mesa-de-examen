import React from 'react';

interface ProfilePageProps {
  username: string | null;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ username }) => {
  return (
    <div>
      <h3>Perfil del Usuario</h3>
      {username ? <p>Bienvenido, {username}</p> : <p>No hay usuario autenticado.</p>}
    </div>
  );
};

export default ProfilePage;