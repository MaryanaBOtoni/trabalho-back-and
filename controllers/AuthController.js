const AuthModel = require('../models/AuthModel');

const authController = {
    index: (req, res) => {
        res.render('login', { title: 'Login' });
    },

    login: async (req, res) => {
        const { nome, password } = req.body;

        try {
            const user = await AuthModel.login(nome, password);
            if (!user) {
                return res.status(401).json({ message: 'Credenciais inválidas' });
            }
            const token = AuthModel.generateToken({ id: user.id, usuario: user.us });
            return res.json({ token });
        } catch (error) {
            console.error('Erro ao tentar fazer login:', error);
            return res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }
};

module.exports = authController;
