const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const dotenv = require('dotenv');

dotenv.config();

const authMiddleware = (req, res, next) => {
  // Verifica se o cabeçalho Authorization está presente
  const token = req.headers.authorization;

  // Verifica se o token não está presente
  if (!token) {
    return res.status(401).json({ message: 'Token de autenticação não fornecido' });
  }

  // Verifica se o token está no formato correto
  if (!token.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Formato do token inválido' });
  }

  // Extrai apenas o token sem o prefixo 'Bearer '
  const authToken = token.split(' ')[1];

  // Verifica e decodifica o token JWT
  jwt.verify(authToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token de autenticação inválido' });
    }

    // Se o token for válido, decodificado e verificado com sucesso
    req.user = decoded;
    next(); // Passa para o próximo middleware ou rota
  });
};

module.exports = authMiddleware;
