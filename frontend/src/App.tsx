import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import { Home, Login, Register, About } from './pages';
import Tasks from './pages/userPages/Tasks/Tasks';
import useAuth from './hooks/useAuth';
import UserHome from './pages/userPages/UserHome/UserHome';


function App() {

  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuthenticated ? <UserHome /> : <Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path='/tasks' element={<Tasks />} />
      </Routes>
    </Router>
  );
}

export default App;
