/*

front fetch(http://localhost:3001/home)

request GET(http://localhost:3001/home) 

? tengo que buscar data en DB ---->

response

*/

	
var http = require('http')
var fs = require('fs') 
const PORT = 3001

	
http.createServer(function (req, res){

    console.log(req.url)
   if (req.url === '/'){
    res.end("todo ok")
   }
   else if (req.url === '/html') {
    res.writeHead(201, {'content-type': 'text/html'})
    var html = fs.readFileSync(__dirname +'/html/index.html');
    res.end(html)
   }
   else if (req.url === '/template'){
    var html = fs.readFileSync(__dirname +'/html/template.html', 'utf8'); //Codificamos el buffer para que sea una String
	var nombre = 'Soy Henry!'; //Esta es la variable con la que vamos a reemplazar el template
	html = html.replace('{nombre}', nombre); // Usamos el método replace es del objeto String
	res.end(html);
   }
   else if (req.url === '/json'){
    // enviar una promesa o Async Await ---> a nuestra DB
    res.writeHead(201, {'content-type': 'application/json'})
   // responde DB [{}, {}]
    let obj = {
        nombre: "Pepita",
        apellido: "La Pistolera"
    }
    res.end(JSON.stringify(obj))
   }
   
   
   
   else {
    res.writeHead(404, {'content-type': 'text/plain'})
    res.end("todo mal")
   }

}).listen(PORT, 'localhost', () => {console.log(`running on port ${PORT}`)} )