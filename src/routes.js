const express = require('express');
const router = express.Router();
const TaskController = require('./controllers/TaskController');
const TagController = require('./controllers/TagController');
const UserController = require('./controllers/UserController'); // Ensure this import is correct

// Rotas para Usuários
router.get('/users', UserController.index); // Listar todos os usuários
router.post('/create-account', UserController.store); // Criar um novo usuário
router.put('/users/:id', UserController.update); // Atualizar um usuário
router.delete('/delete-account', UserController.delete); // Deletar um usuário
router.patch('/users/:id/password', UserController.updatePassword); // Atualizar a senha de um usuário


// Rotas para Tarefas
router.get('/tasks', TaskController.index); // Listar todas as tarefas
router.post('/tasks', TaskController.store); // Criar uma nova tarefa
router.put('/tasks/:id', TaskController.update); // Atualizar uma tarefa
router.delete('/tasks/:id', TaskController.delete); // Deletar uma tarefa

router.get('/users/:id/tasks', UserController.getUserTasks); // Listar todas as tarefas de um usuário

// Rotas para Tags
router.get('/tags', TagController.index); // Listar todas as tags
router.post('/tags', TagController.store); // Criar uma nova tag
router.put('/tags/:id', TagController.update); // Atualizar uma tag
router.delete('/tags/:id', TagController.delete); // Deletar uma tag

module.exports = router;