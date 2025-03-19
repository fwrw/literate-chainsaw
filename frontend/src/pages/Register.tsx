import { useState } from 'react';
import api from '../services/api';
import { Layout } from '../components';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post('/register', { username, password });
      console.log('Registration successful:', response.data);
    } catch (error) {
      console.error('Error registering:', error);
    }
  };

  return (
    <Layout>
<div>
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
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
        <button type="submit">Register</button>
      </form>
    </div>
    </Layout>
    
  );
};

export default Register;