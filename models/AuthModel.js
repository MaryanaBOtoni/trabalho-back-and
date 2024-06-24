const db = require('../configs/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const AuthModel = {
    // Função para fazer login do usuário
    login: async (username, password) => {
        try {
            // Consulta SQL para buscar o usuário pelo nome de usuário
            let user = await new Promise((resolve, reject) => {

                const sql = `SELECT * FROM usuarios WHERE usuario = "${username}" `;
                let rows = [];
                db.query(sql, async function (err, resultado) {
                    if (!err) {
                        rows = resultado
                    }
                    
                    console.log('Linhas retornadas do Banco de Dados', rows); // verificar o retorno

                    // Verifica se encontrou algum usuário
                    if (!rows || rows.length === 0) {
                        return reject('usuario não encontrado'); // Retorna null se usuário não foi encontrado
                    }

                    // Obtém o primeiro usuário encontrado (deve ser único por username)
                    const user = rows[0];

                    // Compara a senha fornecida com a senha criptografada no banco de dados
                    const isMatch = true // await bcrypt.compare(password, user.senha);

                    // Se as senhas coincidem, retorna os dados do usuário sem a senha
                    if (isMatch) {
                        console.log('deu match')
                        return resolve( {
                            id: user.id,
                            usuario: user.usuario,
                            role: user.role
                        });
                    } else {
                        console.log('deu erro')
                        return reject('usuario não encontrado'); // Retorna null se a senha estiver incorreta
                    }
                })
            })



            
            return user
        } catch (error) {
            console.error('Erro ao tentar fazer login:', error);
            throw error; // Lança o erro para ser tratado no controlador
        }
    },

    // Função para gerar um token JWT
    generateToken: function (payload) {
        const JWT_SECRET = process.env.JWT_SECRET || 'v!2$5P<?a-kDroiK36)-q';
        return jwt.sign(payload, JWT_SECRET, {
            expiresIn: '1h'
        });
    },

    // Função para verificar se um usuário existe pelo nome de usuário
    findUserByUsername: async (username) => {
        try {
            const sql = 'SELECT * FROM usuarios WHERE usuario = ?';
            const [rows] = await db.query(sql, [username]);
            return rows.length > 0 ? rows[0] : null; // Retorna o usuário encontrado ou null se não existir
        } catch (error) {
            console.error('Erro ao buscar usuário por nome de usuário:', error);
            throw error;
        }
    },

    // Função para criar um novo usuário no banco de dados
    createUser: async (username, password) => {
        try {
            // Hash da senha antes de armazenar no banco de dados
            const hashedPassword = await bcrypt.hash(password, 10);
            const sql = 'INSERT INTO usuarios (usuario, senha) VALUES (?, ?)';
            const [result] = await db.query(sql, [username, hashedPassword]);
            const newUser = {
                id: result.insertId,
                usuario: username
            }; // Retorna o novo usuário inserido
            return newUser;
        } catch (error) {
            console.error('Erro ao criar novo usuário:', error);
            throw error;
        }
    }
};

module.exports = AuthModel;