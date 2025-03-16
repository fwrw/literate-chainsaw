import { useEffect, useState } from 'react';
import api from './services/api';
import './App.css';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    console.log('useEffect called');
    api.get('/users')
      .then(response => {
        console.log('API response:', response.data);
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
