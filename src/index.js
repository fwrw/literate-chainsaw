const express = require('express');
const routes = require('./routes');
const { sequelize } = require('./models');

const app = express();

// Middleware para permitir o uso de JSON no corpo das requisições
app.use(express.json());

// Usar as rotas definidas
app.use(routes);

// Sincronizar o banco de dados e iniciar o servidor
sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
  });
});