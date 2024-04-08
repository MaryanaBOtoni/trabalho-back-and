var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var clientesRouter = require('./routes/clientes'); // adiciona as rotas a cadeia de middleware
var produtosRouter = require('./routes/produtos'); // adiciona as rotas a cadeia de middleware


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
app.use('/stylesheets', express.static(__dirname + '/node_modules/bootstrap/dist/css'));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/clientes', clientesRouter);
app.use('/produtos', produtosRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res) {
// set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};


    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
