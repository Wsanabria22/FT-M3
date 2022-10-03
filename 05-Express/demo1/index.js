var express = require('express');

var app = express();
app.listen(3001);

app.use("/", function (req, res, next) {
    console.log("Hicieron un Request a " + req.url);
    next();
  });

app.get("/", (req, rest)=>{
    rest.send('Ruta para GET');
})

app.get("/api", function (req, res) {
    var obj = {
      nombre: "prueba",
      framework: "express",
      ventaja: "serializó por nosotros",
    };
    res.json(obj);
  });

  app.get("/api1/:id/:nombre", function (req, res) {
    res.json({ parametro1: req.params.id,
                parametro2 : req.params.nombre });
  });

  app.use("/assets/", express.static(__dirname + "/static"));

  app.get("/static", function (req, res) {
    res.send(
      '<html><head> \
        <link href="/assets/style.css" rel="stylesheet"> \
        </head><body> \
        <p>Archivos estaticos rapido y facil!!</p>\
        <img src="/assets/imagen.jpg">\
        </body></html>'
    );
  });

  app.get("/datos/", function (req, res) {
    res.json(req.query);
  });

  app.get("/form", function (req, res) {
    res.send(
      '<html><head> \
     <link href="/assets/style.css" rel="stylesheet"> \
     </head><body>\
      <form method="POST" action="/form">\
      Nombre <input name="nombre" type="text"><br>\
      Apellido <input name="apellido" type="text"><br>\
      Curso <input name="curso" type="text"><br>\
      <input type="submit">\
      </form>\
     </body></html>'
    );
  });
  
  app.use(express.urlencoded({ extended: false }));
  app.post("/form", function (req, res) {
    res.json(req.body);
  });

app.use(express.json());
app.post("/formjson", function (req, res) {
  res.json(req.body);
});