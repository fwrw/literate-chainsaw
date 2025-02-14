const { Task, Tag, User } = require("../models");

class TaskController {
  // Listar todas as tarefas
  async index(req, res) {
    try {
      const tasks = await Task.findAll({
        include: [{ model: Tag, through: { attributes: [] } }], // Inclui as tags relacionadas
      });
      return res.json(tasks);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao buscar tarefas" });
    }
  }

  // Criar uma nova tarefa
  async store(req, res) {
    try {
      const { title, status, priority, description, tags = [], userId } = req.body;

      const user = await User.findByPk(userId);

      if (!user) {
        throw new Error("Falha ao criar task: Usuário não encontrado");
      }

      const task = await Task.create({
        title,
        status,
        priority,
        description,
        userId,
      });

      const tagInstances = await Promise.all(
        tags.map(async (tagName) => {
          const [tag] = await Tag.findOrCreate({
            where: { name: tagName, userId },
            defaults: { color: '#000000', userId, taskId: task.id } // Set default color value, userId, and taskId
          });
          return tag;
        })
      );

      if (tags.length > 0) {
        await task.setTags(tagInstances);
      }

      return res.status(201).json(task);
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { title, status, priority, description, tags } = req.body;

      const task = await Task.findByPk(id);
      if (!task) {
        return res.status(404).json({ error: "Tarefa não encontrada" });
      }

      await task.update({ title, status, priority, description });

      if (tags) {
        await task.setTags(tags);
      }

      return res.json(task);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao atualizar tarefa" });
    }
  }

  async delete(req, res) {
    try {
      const { id, UserId } = req.params;

      const user = await User.findByPk(UserId);

      if (!user) {
        throw new Error("Falha ao deletar task. Usuário não encontrado");
      }

      const task = await Task.findByPk(id);
      if (!task) {
        return res.status(404).json({ error: "Tarefa não encontrada" });
      }

      await task.destroy();
      return res.json({ message: "Tarefa deletada com sucesso" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // Listar todas as tarefas de um usuário específico
  async getUserTasks(req, res) {
    try {
      const { userId } = req.params;

      if (userId == null) {
        return res.status(400).json({ error: "cade o user paizao" });
      }

      const tasks = await Task.findAll({
        where: { userId },
        include: [{ model: Tag, through: { attributes: [] } }], // Inclui as tags relacionadas
      });

      if (!tasks.length) {
        return res.status(404).json({
          error: "Nenhuma tarefa encontrada para este usuário",
        });
      }

      return res.json(tasks);
    } catch (error) {
      return res.status(500).json({
        error: "Erro ao buscar tarefas do usuário",
      });
    }
  }

  async getTasksByTagFromUser(req, res) {
    try {
      const { UserId, tagId } = req.params;

      const tag = await Tag.findByPk(tagId);
      if (!tag) {
        return res.status(404).json({ error: "Tag não encontrada" });
      }

      const tasks = await tag.getTasks({
        where: { UserId },
        include: [{ model: Tag, through: { attributes: [] } }], // Inclui as tags relacionadas
      });

      return res.json(tasks);
    } catch {
      return res.status(500).json({ error: "Erro ao buscar tarefas por tag" });
    }
  }
}

module.exports = new TaskController();
