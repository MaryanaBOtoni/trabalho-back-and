const request = require('supertest');
const app = require('../app');
const jwt = require('jsonwebtoken');
const { pool } = require('../configs/database.js'); // Importar o pool

describe('Endpoint Tests', () => {
    let token;

    beforeAll(() => {
        // Gere um token JWT válido para os testes
        token = jwt.sign({ id: 1 }, process.env.JWT_SECRET, { expiresIn: '1h' });
    });

    afterAll(done => {
      // Verifica se o pool está definido antes de tentar encerrar
      if (pool) {
          pool.end(err => {
              if (err) 
                  
              done();
          });
      } else {
          
          done();
      }
  });
  

    test('GET /clientes deve requerer token', async () => {
        const response = await request(app).get('/clientes');
        expect(response.status).toBe(401); // Verifica se /clientes retorna 401 sem token
    });

    test('GET /clientes com token válido deve funcionar', async () => {
        const response = await request(app)
            .get('/clientes')
            .set('Authorization', `Bearer ${token}`); // Define o header Authorization com o token

        expect(response.status).toBe(200); // Verifica se o endpoint retorna 200 com token válido
    });
});
