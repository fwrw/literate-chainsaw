import { useEffect, useState } from 'react';
import { Layout } from '../../../components';
import api from '../../../services/api';

const UserHome = () => {
  const [sessionDetails, setSessionDetails] = useState<{ userId: number | null; message: string }>({
    userId: null,
    message: '',
  });

  useEffect(() => {
    const fetchSessionDetails = async () => {
      try {
        const response = await api.get('/session');
        setSessionDetails(response.data);
      } catch (error) {
        console.error('Erro ao obter detalhes da sessão:', error);
        setSessionDetails({ userId: null, message: 'Usuário não autenticado' });
      }
    };

    fetchSessionDetails();
  }, []);

  return (
    <Layout>
      <div className="p-4">
        <h1 className="text-2xl font-bold">Bem-vindo de volta!</h1>
        {sessionDetails.userId ? (
          <>
            <p className="mt-2">Seu ID de usuário: {sessionDetails.userId}</p>
            <p className="mt-4">{sessionDetails.message}</p>
          </>
        ) : (
          <p className="mt-4 text-red-500">{sessionDetails.message}</p>
        )}
      </div>
    </Layout>
  );
};

export default UserHome;