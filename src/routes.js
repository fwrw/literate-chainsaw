const express = require('express');
const path = require('path');
const router = express.Router();
const TaskController = require('./controllers/TaskController');
const TagController = require('./controllers/TagController');
const UserController = require('./controllers/UserController');
const isAuthenticated = require('./middleware/auth'); // Ensure this import is correct

// Rotas para Usuários
router.get('/users', isAuthenticated, UserController.index); // Listar todos os usuários
router.post('/users', UserController.store); // Criar um novo usuário
router.post('/login', UserController.login); // Login de usuário
router.put('/users/:id', isAuthenticated, UserController.update); // Atualizar um usuário
router.delete('/delete-account', isAuthenticated, UserController.delete); // Deletar um usuário
router.patch('/users/:id/password', isAuthenticated, UserController.updatePassword); // Atualizar a senha de um usuário

// Rotas para Tarefas
router.get('/tasks', isAuthenticated, TaskController.index); // Listar todas as tarefas
router.post('/tasks', TaskController.store); // Criar uma nova tarefa
router.put('/tasks/:id', isAuthenticated, TaskController.update); // Atualizar uma tarefa
router.delete('/tasks/:id', isAuthenticated, TaskController.delete); // Deletar uma tarefa
// router.get('/users/:id/tasks', isAuthenticated, UserController.getUserTasks); // Listar todas as tarefas de um usuário
router.get('/users/:id/tasks', UserController.getUserTasks); // Listar todas as tarefas de um usuário

// Rotas para Tags
router.get('/tags', isAuthenticated, TagController.index); // Listar todas as tags
router.post('/tags', isAuthenticated, TagController.store); // Criar uma nova tag
router.put('/tags/:id', isAuthenticated, TagController.update); // Atualizar uma tag
router.delete('/tags/:id', isAuthenticated, TagController.delete); // Deletar uma tag
router.patch('/tasks/:id', isAuthenticated, TaskController.changeTaskStatus); // alterna o status da tarefa
router.get('/user/tags', isAuthenticated, TagController.getUserTags); // Listar todas as tags de um usuário



router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/login.html'));
});

router.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/register.html'));
});

// Root route
router.get('/', (req, res) => {
  if (req.session.userId) {
    res.redirect(`/users/${req.session.userId}/tasks`);
  } else {
    res.redirect('/login');
  }
});

// Serve the tasks page
router.get('/user-tasks', isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, '../public/tasks.html'));
});

router.get('/user-tags', isAuthenticated, (req, res) => {

  res.sendFile(path.join(__dirname, '../public/tags.html'));
});

// API endpoint to get user info
router.get('/user-info', isAuthenticated, async (req, res) => {
  const user = await UserController.getUserById(req.session.userId);
  res.json(user);
});

module.exports = router;