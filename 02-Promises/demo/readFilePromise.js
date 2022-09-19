var fs = require('fs');



var promise = new Promise(function(resolve, reject) {
  // Hacer cosas acá dentro, probablemente asincrónicas.
  fs.readFile('./archivos.txt', 'utf8', function(err, data) { 
    if (err) {
      return reject(Error("Algo se rompió"));
    }
    console.log('2:',data);    
    resolve(data);
  }); 
});


// var promiseOne = promise();
console.log('1:',promise);

var nuevaDataPromesa = promise.then(function(data) {
  var nuevaData = data.split('').splice(0, 100).join('');
  console.log('3:',nuevaData)
  return nuevaData;
}, function(error){
  console.log(error);
})
.catch(error => console.log(error))

promise.then(
  function(data) {
    console.log('se cumplió la promesa');
  }, 
  error=> console.log('no se cumplio la promesa')
)


console.log('HolIII');

// var lectura;
// fs.readFile('./archivo.txt', 'utf8', function(err, data) { 
//   lectura = data;
// }); 

// console.log(lectura);





//    dataBase.verifyUser(username, password, (error, userInfo) => {
//        if (error) {
//            callback(error)
//        }else{
//            dataBase.getRoles(username, (error, roles) => {
//                if (error){
//                    callback(error)
//                }else {
//                    dataBase.logAccess(username, (error) => {
//                        if (error){
//                            callback(error);
//                        }else{
//                            callback(null, userInfo, roles);
//                        }
//                    })
//                }
//            })
//        }
//    })
