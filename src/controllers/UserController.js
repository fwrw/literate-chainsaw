const { User, Task, Tag } = require("../models");
const bcrypt = require("bcrypt");

class UserController {
    async index(req, res) {
        try {
            const users = await User.findAll();

            return res.json(users);
        } catch (error) {
            return res.status(500).json({ error: "Erro ao buscar usuários" });
        }
    }

    async store(req, res) {
        try {
            const { username, password } = req.body;

            const existingUser = await User.findOne({ where: { username } });
            if (existingUser) {
                return res.status(400).json({ error: "Usuário já existe" });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const user = await User.create({
                username,
                password: hashedPassword,
            });

            return res.status(201).json(user);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const { name, password } = req.body;

            const user = await User.findByPk(id);
            if (!user) {
                return res.status(404).json({
                    error: "Usuário não encontrado",
                });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            await user.update({ name, password: hashedPassword });

            return res.json(user);
        } catch (error) {
            return res.status(500).json({ error: "Erro ao atualizar usuário" });
        }
    }

    async updatePassword(req, res) {
        try {
            const { id } = req.params;
            const { password, newPassword } = req.body;
    
            const user = await User.findByPk(id);
            if (!user || !password) {
                throw new Error("Parâmetro ausente");
            }
    
            const isMatch = await bcrypt.compare(password, user.password); // Verifica se a senha atual é igual a senha do usuário
    
            if (isMatch) {
                const hashedNewPassword = await bcrypt.hash(newPassword, 10);
                await user.update({ password: hashedNewPassword });
                return res.json(user);
            } else {
                throw new Error("Senha incorreta");
            }
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
    async delete(req, res) {
        try {
            const { id } = req.params;

            const user = await User.findByPk(id);
            if (!user) {
                return res.status(404).json({
                    error: "Usuário não encontrado",
                });
            }

            await user.destroy();

            return res.json("Usuário deletado com sucesso");
        } catch (error) {
            return res.status(500).json({ error: "Erro ao deletar usuário" });
        }
    }

    async getUserTasks(req, res) {
        try {
            const { id } = req.params;

            const user = await User.findByPk(id);

            if (!user) {
                throw new Error("Usuário não encontrado");
            }

            const tasks = await Task.findAll({
                where: { userId: id },
                include: [{
                    model: Tag,
                    as: 'Tags',
                    attributes: ['name'],
                    through: { attributes: [] }
                }]
            });

            const tasksWithTagNames = tasks.map(task => ({
                ...task.toJSON(),
                Tags: task.Tags.map(tag => tag.name)
            }));

            return res.json(tasksWithTagNames);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new UserController();
