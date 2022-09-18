
const commands = require('./commands');

// console.log(Object.keys(process));
console.log(commands);

const print = (data)=> {
  process.stdout.write(data);
  process.stdout.write('\nprompt > ');
}

// Output un prompt
process.stdout.write('prompt > ');
// El evento stdin 'data' se dispara cuando el user escribe una línea
process.stdin.on('data', function (data) {
  var [cmd, ...args] = data.toString().trim().split(' '); // trim remueve la nueva línea,split separa en un array de strings
  console.log(args);
  if(commands[cmd]) {
    commands[cmd](args,print);  
  } else{
    print('command not found')
  }

  
});