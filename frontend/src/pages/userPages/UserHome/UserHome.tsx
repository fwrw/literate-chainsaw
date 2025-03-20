import { Layout } from '../../../components';
import useAuth from '../../../hooks/useAuth';

const UserHome = () => {
  const { userId } = useAuth();

  return (
    <Layout>
      <div className="p-4">
        <h1 className="text-2xl font-bold">Bem-vindo de volta!</h1>
        <p className="mt-2">Seu ID de usuário: {userId}</p>
        <p className="mt-4">Acesse suas tarefas na aba "Tasks".</p>
      </div>
    </Layout>
  );
};

export default UserHome;