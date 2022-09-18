var fs = require('fs');

var saludo = fs.readFileSync(__dirname +  '/greet.txt', 'utf8');
console.log(saludo);


var saludo1 = fs.readFile(__dirname + '/greet.txt', 'utf-8', function(err, data){
    console.log(data);
})
console.log('Listo! Archivo Leido')
