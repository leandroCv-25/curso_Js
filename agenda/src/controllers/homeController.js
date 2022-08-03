const Contato = require('../models/ContatoModel')

exports.index = async function (req, res) {
  const contatos = await Contato.buscarContatos();
  res.render('index',{contatos});
};

exports.trataPost = (req, res) => {
  res.send(req.body);
  return;
};
