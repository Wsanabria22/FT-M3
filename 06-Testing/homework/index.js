const express = require('express');
const app = express();

app.use(express.json()); // for parsing application/json

app.get('/', (req, res) => {
  res.send({
    message: 'hola',
  });
});

app.get('/test', (req, res) => {
  res.send({ message : 'test'});
});

app.post('/sum', (req, res) => {
  let {a, b} = req.body;
  let result = a + b;
  res.send({'result' : result})
})

app.post('/product', (req, res) => {
  res.send({
    result: req.body.a * req.body.b
  });
});

app.post('/sumArray', (req, res) => {
  let {array, num} = req.body;
  for (let i = 0; i < array.length-1; i++) {
    for (let j = i + 1; j < array.length; j++) {
      if ( array[i] + array[j] === num ) {
        return res.send({result : true});
      };
    }  
  }
  return res.send({result : false});
})

app.post('/numString', (req, res) => {
  let {str} = req.body;
  if (str.length === 0 || typeof str === 'number') res.sendStatus(400);
  res.send({result: str.length});
})

app.post('/pluck', (req, res) => {
  const { array, prop } = req.body;

  if(!Array.isArray(array)) res.sendStatus(400);
  if(!prop) res.sendStatus(400);

  res.json({ result: array.map(obj => obj[prop])})
})


module.exports = app; // Exportamos app para que supertest session la pueda ejecutar
