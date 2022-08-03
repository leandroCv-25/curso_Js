const Login = require('../models/LoginModel');

exports.index = (req, res) => {
    if(req.session.user) return res.redirect('/');
    res.render('login');
};

exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/');
};

exports.acessar = async function (req, res) {
    try {
        const login = new Login(req.body);
        await login.login();

        if (login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save(function () {s
                return res.redirect('back');
            });
            return;
        }

        req.flash('success', 'Você entrou com sucesso.');
        req.session.user = login.user;
        req.session.save(function () {
            return res.redirect('back');
        });
        return;
    } catch (error) {
        res.render('404');
    }
};

exports.register = async function (req, res) {
    try {
        const login = new Login(req.body);
        await login.register();

        if (login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save(function () {
                return res.redirect('back');
            });
            return;
        }

        req.flash('success', 'Seu usuário foi criado com sucesso.');
        req.session.user = login.user;
        req.session.save(function () {
            return res.redirect('back');
        });
        return;
    } catch (error) {
        res.render('404');
    }
};