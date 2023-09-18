"use strict";

// Cargar modulos de node para crear servidor
var express = require("express");
var bodyParser = require("body-parser");

// Ejecutar express (http)
var app = express();

// Cargar ficheros rutas
var title_routes = require("./routes/title");
var experience_routes = require("./routes/experience");
var form_routes = require("./routes/form");
// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method",
	);
	res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
	res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
	next();
});

// Añadir prefijo a rutas
app.use("/api", title_routes);
app.use("/api", experience_routes);
app.use("/api", form_routes);

// Ruta o metodo de prueba para el API REST (comentado)
/*
app.get('/probando', (req, res) => {
    var Hola = req.body.Hola;
    return res.status(200).send({
        Portafolio: 'Portafolio en Frameworks JS & Backend NodeJS',
        autor: 'Aritz Robledo Jorge',
        correo: 'webseobilbao@gmail.com',
        tel: '+34 634 412 771',
        Hola
    });
});
*/

// Exportar módulo (fichero actual)
module.exports = app;
