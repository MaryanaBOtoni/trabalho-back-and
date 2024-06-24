const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const AuthModel = require('../models/AuthModel');

dotenv.config();

// Rota para renderizar o formulário de login (GET)
router.get('/login', (req, res) => {
  res.render('login'); // Renderiza o formulário de login
});

// Rota para processar o login de usuários (POST)
router.post('/login/auth', async (req, res) => {
  const { nome, password } = req.body;

  try {
    // Verifica se o usuário existe no banco de dados
    const user = await AuthModel.login(nome, password);
    console.log(user)
    
    if (!user) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    // Gera o token JWT para o usuário autenticado
    const token = jwt.sign({ id: user.id, nome: user.nome }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token }); // Retorna o token para o front-end após o login
  } catch (error) {
    console.error('Erro durante o login:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// Rota para processar o registro de novos usuários (POST)
router.post('/register', async (req, res) => {
  const { nome, password } = req.body;

  try {
    // Verifica se o usuário já existe no banco de dados
    const existingUser = await AuthModel.findUserByUsername(nome);
    if (existingUser) {
      return res.status(400).json({ message: 'Usuário já existe' });
    }

    // Hash da senha antes de salvar no banco de dados
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insere o novo usuário no banco de dados
    const newUser = await AuthModel.createUser(nome, hashedPassword);

    // Gera o token JWT para o novo usuário
    const token = jwt.sign({ id: newUser.id, nome: newUser.nome }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token }); // Retorna o token para o front-end após o registro
  } catch (error) {
    console.error('Erro durante o registro:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

module.exports = router;
