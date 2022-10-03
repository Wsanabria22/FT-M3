var fs  = require("fs")
var http  = require("http")

// Escribí acá tu servidor

http.createServer(function(req, res){
    if(req.url === '/arcoiris-doge') {
        res.writeHead(200, {'Content-Type':'image/jpeg'});
        let image = fs.readFileSync(__dirname +'/images/arcoiris_doge.jpg');
        res.end(image);
    } else if (req.url === '/badboy-doge') {
        res.writeHead(200, {'Content-Type':'image/jpeg'});
        let image = fs.readFileSync(__dirname +'/images/badboy_doge.jpg');
        res.end(image);
    } else if(req.url === '/resaca-doge') {
        res.writeHead(200, {'Content-Type':'image/jpeg'});
        let image = fs.readFileSync(__dirname +'/images/resaca_doge.jpg');
        res.end(image);
    } else if(req.url === '/retrato-doge') {
        res.writeHead(200, {'Content-Type':'image/jpeg'});
        let image = fs.readFileSync(__dirname +'/images/retrato_doge.jpg');
        res.end(image);
    } else if(req.url === '/sexy-doge') {
        res.writeHead(200, {'Content-Type':'image/jpeg'});
        let image = fs.readFileSync(__dirname +'/images/sexy_doge.jpg');
        res.end(image);
    }
    else {
        res.writeHead(404);
        res.end('Imagen no encontrada')
    }

}).listen(1337, '127.0.0.1');
