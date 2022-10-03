const session = require('supertest-session');
const app = require('../index.js'); // Importo el archivo de entrada del server de express.

const agent = session(app);

describe('Test de APIS', () => {
  describe('GET /', () => {
    it('responds with 200', () => agent.get('/').expect(200));
    it('responds with and object with message `hola`', () =>
        agent.get('/').then((res) => {
          expect(res.body.message).toEqual('hola');
        }));
  });

  describe('GET /test', () => {
    it('responds with 200', () => agent.get('/test').expect(200));
    it('responds with and object with message `test`', () =>
      agent.get('/test').then((res) => {
        expect(res.body.message).toEqual('test');
      }));
  });

  describe('POST /sum', () => {
    it('responds with 200', () => agent.post('/sum').expect(200));
    it('responds with the sum of 2 and 3', () =>
      agent.post('/sum')
        .send({a: 2, b: 3})
        .then((res) => {
          expect(res.body.result).toEqual(5);
        })
    );
  });

  describe('POST /producto', () => {
    it('responds with 200', () => agent.post('/product').expect(200));
    it('responds with the product of 2 and 3', () =>
      agent.post('/product')
        .send({a: 2, b: 3})
        .then((res) => {
          expect(res.body.result).toEqual(6);
        })
    );
  });

  describe('POST /sumArray', () => {
    it('responds with 200', () => agent.get('/test').expect(200));
    it('responds with an object with array elemets sum', () =>
      agent.post('/sumArray')
        .send({array: [2,5,7,10,11,15,20], num: 13})
        .then((res) => {
          expect(res.body.result).toEqual(true);
      }));

    it('responds false if the sum of two values is not equal to num', () =>
      agent.post('/sumArray')
        .send({array: [2,5,7,10,11,15,20], num: 58})
        .then((res) => {
          expect(res.body.result).toEqual(false);
      }));
  });


  describe('POST /numString', () => {
    it('responds with 200', () => agent.post('/numString').send({str: 'str'}).expect(200));
    
    it('responds with 4 if the string is `hola`', () => {
      agent.post('/numString')
        .send({str: 'hola'})
        .then((res) => expect(res.body.result).toBe(4))
    });

    it('responds with 400 if string is a number', ()=> agent.post('/numString').send({str: 5}).expect(400));
    it('responds with 400 if string is empty', ()=> agent.post('/numString').send({str: ''}).expect(400));
  });


  describe('POST /pluck', () => {
    const array = [{nombre: "Alejo", apellido: "Mejia"}, {nombre: "Gonzalo", apellido: "Fara"}];

    it('Responds with  200', ()=> agent.post('/pluck').send({array: array, prop: 'algo'}).expect(200));

    it('Responds with ["Alejo", "Gonzalo"] if the array is [{nombre: "Alejo", apellido: "Mejia"}, {nombre: "Gonzalo", apellido: "Fara"}] and the prop is "nombre"', () => {
      agent.post('/pluck')
      .send({array: array, prop: 'nombre'})
      .then((res) => {
        expect(res.body.result).toEqual(["Alejo", "Gonzalo"]);
      })
    });

    it('Responds with 400 if array is not array type', () => agent.post('/pluck').send({array: 'hola', prop: 'ninguna'}).expect(400));

    it('Responds with 400 if prop is empty', () => agent.post('/pluck').send({array: array, prop: ''}).expect(400));
  });


});

