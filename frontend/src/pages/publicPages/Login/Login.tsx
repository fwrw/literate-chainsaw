import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Layout } from '../../../components';
import api from '../../../services/api';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post('/login', { username, password });
      console.log('Login successful:', response.data);

      // Armazena o userId no localStorage
      localStorage.setItem('userId', response.data.userId);

      // Redireciona para a página de tarefas
      navigate('/tasks');
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <Layout>
      <div>
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </Layout>
  );
};

export default Login;