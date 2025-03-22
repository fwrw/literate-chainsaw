import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import { Home, Login, Register, About } from './pages';
import Tasks from './pages/userPages/Tasks/Tasks';
import useAuth from './hooks/useAuth';
import UserHome from './pages/userPages/UserHome/UserHome';
import NewTask from './pages/userPages/Tasks/NewTask';
import Tags from './pages/userPages/Tags/Tags';
import NewTag from './pages/userPages/Tags/NewTag';
import UpdateTask from './pages/userPages/Tasks/UpdateTask';
import UpdateTag from './pages/userPages/Tags/UpdateTag';
import AddTags from './pages/userPages/Tasks/AddTags';


function App() {

  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuthenticated ? <UserHome /> : <Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path='/tasks' element={isAuthenticated ? <Tasks /> : <Home/>} />
        <Route path='/tags' element={isAuthenticated ? <Tags /> : <Home/>} />

        <Route path='/new-task' element={isAuthenticated ? <NewTask/> : <Home/>} />

        <Route path='/new-tag' element={isAuthenticated ? <NewTag/> : <Home/>} />

        <Route path='/update-task/:id' element={isAuthenticated ? <UpdateTask/> : <Home/>}> </Route>
        <Route path='/update-tag/:id' element={isAuthenticated ? <UpdateTag /> : <Home />} />

        <Route path='/add-tag/:id' element={isAuthenticated ? <AddTags/> : <Home/> }></Route>


      </Routes>
    </Router>
  );
}

export default App;
