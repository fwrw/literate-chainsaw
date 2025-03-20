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

      // Create the task first
      const task = await Task.create({
        title,
        status,
        priority,
        description,
        userId,
      });

      // Create or find the tags and associate them with the task
      if (tags.length > 0) {
        const tagInstances = await Promise.all(
          tags.map(async (tag) => {
            const [tagInstance] = await Tag.findOrCreate({
              where: { name: tag.name, userId },
              defaults: { userId, color: tag.color }
            });
            return tagInstance;
          })
        );

        await task.addTags(tagInstances.map(tag => tag.id));
      }

      return res.status(201).json(task);
    } catch (error) {
      console.error('Error creating task:', error);
      return res.status(500).json({ error: 'Failed to create task' });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { title, status, priority, description, tags = [] } = req.body;

      const task = await Task.findByPk(id);
      if (!task) {
        return res.status(404).json({ error: "Tarefa não encontrada" });
      }

      await task.update({ title, status, priority, description });

      // Update tags
      if (tags.length > 0) {
        const tagInstances = await Promise.all(
          tags.map(async (tag) => {
            // Verifica se a tag já existe
            const [tagInstance, created] = await Tag.findOrCreate({
              where: { name: tag.name, userId: task.userId },
              defaults: { userId: task.userId, color: tag.color || '#000000' }
            });

            // Se a tag já existia e a cor não foi fornecida, mantém a cor existente
            if (!created && !tag.color) {
              tagInstance.color = tagInstance.color; // Mantém a cor existente
            } else if (tag.color) {
              tagInstance.color = tag.color; // Atualiza a cor se fornecida
            }

            await tagInstance.save(); // Salva a tag com a cor correta
            return tagInstance;
          })
        );

        await task.setTags(tagInstances.map(tag => tag.id));
      } else {
        await task.setTags([]); // Remove all tags if no tags are provided
      }

      return res.json(task);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao atualizar tarefa" });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
  
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
      const userId = req.session.userId; // Obtém o userId da sessão

      if (!userId) {
        return res.status(403).json({ error: 'Usuário não autenticado',
          ID: userId
         });
      }

      const tasks = await Task.findAll({
        where: { userId },
        include: [
          {
            model: Tag,
            as: 'Tags',
            attributes: ['id', 'name', 'color'],
            through: { attributes: [] }, // Não inclui os atributos da tabela de junção
          },
        ],
      });

      if (!tasks.length) {
        return res.status(404).json({ error: 'Nenhuma tarefa encontrada para este usuário' });
      }

      return res.json(tasks);
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error);
      return res.status(500).json({ error: 'Erro ao buscar tarefas' });
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

  async changeTaskStatus(req, res) {
    try {
      const { id } = req.params;

      const task = await Task.findByPk(id);
      if (!task) {
        return res.status(404).json({ error: "Tarefa não encontrada" });
      }

      if (task.status == 'in progress') {
        await task.update({ status: 'finished' });
        return res.json(task);
      }

      if (task.status == 'finished') {
        await task.update({ status: 'in progress' });
        return res.json(task);
      }

      return res.status(400).json({ error: "Status inválido" });
      
    } catch (error) {
      return res.status(500).json({ error: "Erro ao finalizar tarefa" });
    }
  }
}

module.exports = new TaskController();
