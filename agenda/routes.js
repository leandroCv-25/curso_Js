const express = require('express');
const route = express.Router();

const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const contatoController = require('./src/controllers/ContatoController');

const {loginRequired} = require('./src/middlewares/middleware')

// Rotas da home
route.get('/', homeController.index);

//Rotas de login
route.get('/login/index',loginController.index);
route.post('/login/acessar',loginController.acessar);
route.post('/login/logout',loginController.logout);
route.post('/login/register',loginController.register);

//Rotas de contato
route.get('/contato/index',loginRequired,contatoController.index);
route.post('/contato/register',loginRequired,contatoController.register);
route.get('/contato/index/:id',loginRequired,contatoController.edit);
route.post('/contato/edit/:id',loginRequired,contatoController.editContato);
route.get('/contato/delete/:id',loginRequired,contatoController.delete);



module.exports = route;
