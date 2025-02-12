const express = require('express');
const router = express.Router();
const TaskController = require('./controllers/TaskController');
const TagController = require('./controllers/TagController');

// Rotas para Tarefas
router.get('/tasks', TaskController.index); // Listar todas as tarefas
router.post('/tasks', TaskController.store); // Criar uma nova tarefa
router.put('/tasks/:id', TaskController.update); // Atualizar uma tarefa
router.delete('/tasks/:id', TaskController.delete); // Deletar uma tarefa

// Rotas para Tags
router.get('/tags', TagController.index); // Listar todas as tags
router.post('/tags', TagController.store); // Criar uma nova tag
router.put('/tags/:id', TagController.update); // Atualizar uma tag
router.delete('/tags/:id', TagController.delete); // Deletar uma tag

module.exports = router;