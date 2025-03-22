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
        userId: req.session.userId, // Para o bônus de autenticação 
      });

      return res.status(201).json(tag);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao criar tag' });
    }
  }

  // Atualizar uma tag existente
  async update(req, res) {
    try {
      const { id, name, color } = req.body;
      const userId = req.session.userId;

      // Busca a tag pelo ID
      const tag = await Tag.findByPk(id);

      if (!tag) {
        return res.status(404).json({ error: "Tag não encontrada" });
      }

      // Verifica se o userId da sessão corresponde ao userId da tag
      if (tag.userId !== userId) {
        return res.status(403).json({ error: "Acesso negado" });
      }

      // Atualiza os campos fornecidos
      const updateData = {};
      if (name !== undefined) updateData.name = name;
      if (color !== undefined && color !== "#000000") updateData.color = color;

      await tag.update(updateData);
      return res.json(tag);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao atualizar tag" });
    }
  }

  async changeTagColor(req, res) {
    try {
      const { id, color } = req.body;

      // Busca a tag pelo ID
      const tag = await Tag.findByPk(id);
      if (!tag) {
        return res.status(404).json({ error: 'Tag não encontrada' });
      }

      if(req.session.userId !== tag.userId) {
        return res.status(403).json({ error: 'Acesso negado' });
      }

      // Atualiza a cor da tag
      await tag.update({ color });
      return res.json(tag);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao atualizar cor da tag' });
    }
  }

  async changeTagName(req, res) {
    try {
      const { id, name } = req.body;

      // Busca a tag pelo ID
      const tag = await Tag.findByPk(id);
      if (!tag) {
        return res.status(404).json({ error: 'Tag não encontrada' });
      }

      if(req.session.userId !== tag.userId) {
        return res.status(403).json({ error: 'Acesso negado' });
      }

      // Atualiza a cor da tag
      await tag.update({ name });
      return res.json(tag);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao atualizar cor da tag' });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const userId = req.session.userId;

      // Busca a tag pelo ID
      const tag = await Tag.findByPk(id);

      if (!tag) {
        return res.status(404).json({ error: "Tag não encontrada" });
      }

      // Verifica se o userId da sessão corresponde ao userId da tag
      if (tag.userId !== userId) {
        return res.status(403).json({ error: "Acesso negado" });
      }

      return res.json(tag);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao buscar tag" });
    }
  }

  // Deletar uma tag
  async delete(req, res) {
    try {
      const { id } = req.body;
      const userId = req.session.userId;

      // Busca a tag pelo ID
      const tag = await Tag.findByPk(id);

      if (!tag) {
        return res.status(404).json({ error: "Tag não encontrada" });
      }

      // Verifica se o userId da sessão corresponde ao userId da tag
      if (tag.userId !== userId) {
        return res.status(403).json({ error: "Acesso negado" });
      }

      // Remove a tag
      await tag.destroy();
      return res.json({ message: "Tag deletada com sucesso" });
    } catch (error) {
      return res.status(500).json({ error: "Erro ao deletar tag" });
    }
  }

  async getUserTags(req, res) {
    const userId = req.session.userId;

    if (!userId) {
      return res.status(403).json({ error: "Acesso negado" });
    }

    try {
      const tags = await Tag.findAll({
        where: { userId },
      });

      if (!tags || tags.length === 0) {
        return res.status(404).json({ error: "Nenhuma tag encontrada" });
      }

      return res.json(tags);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao buscar tags" });
    }
  }
}

module.exports = new TagController();