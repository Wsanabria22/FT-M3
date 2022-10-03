var http = require('http');
var fs   = require('fs');

var beatles=[{
  name: "John Lennon",
  birthdate: "09/10/1940",
  profilePic:"https://blogs.correiobraziliense.com.br/trilhasonora/wp-content/uploads/sites/39/2020/10/CBNFOT081020100047-550x549.jpg"
},
{
  name: "Paul McCartney",
  birthdate: "18/06/1942",
  profilePic:"http://gazettereview.com/wp-content/uploads/2016/06/paul-mccartney.jpg"
},
{
  name: "George Harrison",
  birthdate: "25/02/1946",
  profilePic:"https://canaldosbeatles.files.wordpress.com/2012/02/george-george-harrison-8321345-438-600.jpg"
},
{
  name: "Richard Starkey",
  birthdate: "07/08/1940",
  profilePic:"http://cp91279.biography.com/BIO_Bio-Shorts_0_Ringo-Starr_SF_HD_768x432-16x9.jpg"
}
]

http.createServer(function(req, res){
  if (req.url === '/'){
    res.writeHead(200, {'Content-Type' : 'text/html'});
    let html = fs.readFileSync(__dirname + '/index.html')
    return res.end(html);
  } 
  
  if (req.url === '/api') {
    res.writeHead(200, {'Content-Type' : 'application/json'});
    return res.end(JSON.stringify(beatles));
  } 
  
  if (req.url.substring(0, 5) === '/api/') {
    let nameSinger = req.url.replace('/api/','');
    nameSinger = nameSinger.replace('%20',' ');
    let dataSinger = beatles.filter(el => el.name === nameSinger);
    if (dataSinger.length) {
      res.writeHead(200, {'Content-Type' : 'application/json'});
      return res.end(JSON.stringify(dataSinger));  
    } else {
      res.writeHead(404);
      return res.end('Error 404: Page not found');
    }
  } else {
    let nameBeatle = req.url.replace('/','');
    nameBeatle = decodeURI(nameBeatle);
    let dataBeatle = beatles.find(beatle => beatle.name === nameBeatle);
    if(dataBeatle) {
      fs.readFile(__dirname + '/beatle.html', 'utf8', 
      function(err, data){
        if(err) {
          res.writeHead(404, {'Content-Type' : 'text/plain'});
          return res.end('Error 404: File HTML not found');
        }
        data = data.replace('{name}', dataBeatle.name);
        data = data.replace('{birthdate}', dataBeatle.birthdate);
        data = data.replace('{profilePic}', dataBeatle.profilePic);
        res.writeHead(200, {'Content-Type' : 'text/html'});
        return res.end(data);
      });
    } else {
        res.writeHead(404, {'Content-Type' : 'text/plain'});
        return res.end('Error 404: File HTML not found');
    }
    
  }

}).listen(1337, '127.0.0.1');
