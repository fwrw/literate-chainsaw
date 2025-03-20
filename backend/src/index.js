const express = require('express');
const cors = require('cors');
const path = require('path');
const session = require('express-session');
const routes = require('./routes');
const { sequelize } = require('./models');

const app = express();
const allowedOrigins = [
  'http://localhost:5173', // Seu frontend
  'http://127.0.0.1:5173'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Bloqueado por CORS'));
    }
  },
  credentials: true // Permite cookies e headers de autenticação
};

app.use(cors(corsOptions));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, '../public')));

// Middleware para permitir o uso de JSON no corpo das requisições
app.use(express.json());

// Set up session middleware
app.use(session({
  secret: 'eitakimassa', // Replace with a strong secret key
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));

// Usar as rotas definidas
app.use(routes);

// Sincronizar o banco de dados e iniciar o servidor
sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
  });
});