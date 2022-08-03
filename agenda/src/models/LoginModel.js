const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs')

const LoginSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const LoginModel = mongoose.model('Login', LoginSchema);

class Login {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null;
  }

  async login() {
    this.valida();
    if (this.errors.length > 0) return;
    await this.userExists()
    if (!this.user) {
      this.errors.push('Usuário ou senha inválidos');
      return;
    }

    if(!bcryptjs.compareSync(this.body.password,this.user.password)){
      this.errors.push('Usuário ou senha inválidos');
      this.user = null;
      return;
    }
  }

  async register() {
    this.valida();
    if (this.errors.length > 0) return;
    await this.userExists()
    if (this.user) {
      this.errors.push('Usuário já existe.');
      return;
    }

    const salt = bcryptjs.genSaltSync();
    this.body.password = bcryptjs.hashSync(this.body.password, salt);
    this.user = await LoginModel.create(this.body);

  }

  async userExists() {
    this.user = await LoginModel.findOne({
      email: this.body.email
    });
  }

  valida() {
    this.cleanUp();
    //validação
    //O e-mail precisa ser válido
    if (!validator.isEmail(this.body.email)) {
      this.errors.push('E-mail inválido');
    }
    //senha precisa ter entre 3 a 50 caracteres
    if (this.body.password.length < 3 || this.body.password.length > 50) {
      this.errors.push('Senha precisa ter entre 3 a 50 caracteres');
    }
  }

  cleanUp() {
    for (let key in this.body) {
      if (typeof this.body[key] !== 'string') {
        this.body[key] = '';
      }
    }

    this.body = {
      email: this.body.email,
      password: this.body.password
    }
  }
}

module.exports = Login;
