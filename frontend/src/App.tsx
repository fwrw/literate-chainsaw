import { useEffect, useState } from 'react';
import api from './services/api';
import './App.css';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    console.log('useEffect called'); // Log para verificar chamadas duplicadas
    api.get('/tasks')
      .then(response => {
        console.log('API response:', response.data); // Log da resposta completa
        setMessage(response.data.message);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <>
      <h1 className="text-3xl font-bold underline">
        {message || "Loading..."}
      </h1>
    </>
  );
}

export default App;
