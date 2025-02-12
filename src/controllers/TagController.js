const { Tag } = require('../models');

class TagController {
  // Listar todas as tags
  async index(req, res) {
    try {
      const tags = await Tag.findAll();
      return res.json(tags);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar tags' });
    }
  }

  // Criar uma nova tag
  async store(req, res) {
    try {
      const { name, color } = req.body;

      // Cria a tag
      const tag = await Tag.create({
        name,
        color,
        userId: req.userId, // Para o bônus de autenticação
      });

      return res.status(201).json(tag);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao criar tag' });
    }
  }

  // Atualizar uma tag existente
  async update(req, res) {
    try {
      const { id } = req.params;
      const { name, color } = req.body;

      // Busca a tag pelo ID
      const tag = await Tag.findByPk(id);
      if (!tag) {
        return res.status(404).json({ error: 'Tag não encontrada' });
      }

      // Atualiza os campos da tag
      await tag.update({ name, color });
      return res.json(tag);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao atualizar tag' });
    }
  }

  // Deletar uma tag
  async delete(req, res) {
    try {
      const { id } = req.params;

      // Busca a tag pelo ID
      const tag = await Tag.findByPk(id);
      if (!tag) {
        return res.status(404).json({ error: 'Tag não encontrada' });
      }

      // Remove a tag
      await tag.destroy();
      return res.json({ message: 'Tag deletada com sucesso' });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao deletar tag' });
    }
  }
}

module.exports = new TagController();