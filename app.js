const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const createError = require('http-errors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

// Rotas
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const clientesRouter = require('./routes/clientes');
const produtosRouter = require('./routes/produtos');
const authRouter = require('./routes/auth');

// Middleware de autenticação JWT
const authMiddleware = require('./middlewares/authMiddleware'); // Ajuste o nome do arquivo conforme necessário

const app = express();

// Configuração de middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/stylesheets', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Rotas principais
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/clientes', authMiddleware, clientesRouter); // Protegido por autenticação JWT
app.use('/produtos', authMiddleware, produtosRouter); // Protegido por autenticação JWT
app.use('/', authRouter); // Rota para autenticação

// Middleware para tratar erros 404
app.use(function(req, res, next) {
  next(createError(404));
});

// Middleware para tratamento de erros
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error'); // Renderiza a página de erro
});

module.exports = app;
