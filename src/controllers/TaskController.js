const { Task, Tag } = require('../models');

class TaskController {
  // Listar todas as tarefas
  async index(req, res) {
    try {
      const tasks = await Task.findAll({
        include: [{ model: Tag, through: { attributes: [] } }], // Inclui as tags relacionadas
      });
      return res.json(tasks);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar tarefas' });
    }
  }

  // Criar uma nova tarefa
  async store(req, res) {
    try {
      const { title, status, priority, description, tags, userId } = req.body;

      if (userId == null) {
        return res.status(400).json({ error: 'cade o user paizao' });
      }

      const task = await Task.create({
        title,
        status,
        priority,
        description,
        userId
      });

      if (tags && tags.length > 0) {
        await task.setTags(tags);
      }

      return res.status(201).json(task);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao criar tarefa' });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { title, status, priority, description, tags } = req.body;

      const task = await Task.findByPk(id);
      if (!task) {
        return res.status(404).json({ error: 'Tarefa não encontrada' });
      }

      await task.update({ title, status, priority, description });

      if (tags) {
        await task.setTags(tags);
      }

      return res.json(task);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao atualizar tarefa' });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      const task = await Task.findByPk(id);
      if (!task) {
        return res.status(404).json({ error: 'Tarefa não encontrada' });
      }

      await task.destroy();
      return res.json({ message: 'Tarefa deletada com sucesso' });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao deletar tarefa' });
    }
  }
}

module.exports = new TaskController();