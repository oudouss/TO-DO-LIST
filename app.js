var express =require('express');
var bodyparser =require ('body-parser');
var session = require ('express-session');
var urlencodedparser = bodyparser.urlencoded({ extended: false});

var app = express();
app.set('view engine', 'ejs');

app.use(session({
    secret: 'todosecret',
    saveUninitialized: true,
    resave: false
}));

app.use(function (req, res, next) {
    if (typeof (req.session.todolist) == 'undefined') {
        req.session.todolist = [];
    }
    next();
});

app.get('/', function(req, res, next){
    res.redirect('/todo');
});

app.get('/todo', function(req, res){
    res.render('todo.ejs', {todolist: req.session.todolist});
});

app.post('/todo/ajouter/', urlencodedparser,  function(req, res){
    if (req.body.newtodo != '') {
        req.session.todolist.push(req.body.newtodo);
    }
    res.redirect('/todo');
});

app.get('/todo/supprimer/:id', function(req, res){
    if (req.params.id != '') {
        req.session.todolist.splice(req.params.id,1);
    }
    res.redirect('/todo');
});

app.listen(3000,function () {
    console.log('server started on port:3000');
});