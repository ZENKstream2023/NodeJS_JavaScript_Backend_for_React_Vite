"use strict";

const mongoose = require("mongoose");
const app = require("./app");
const port = process.env.PORT || 3900;

// Conectar a la base de datos
mongoose
	.connect("mongodb://127.0.0.1:27017/portafolio", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("Conexión a la base de datos establecida correctamente");

		// Iniciar el servidor
		app.listen(port, () => {
			console.log(`Servidor corriendo en http://localhost:${port}`);
		});
	})
	.catch((error) => {
		console.error("Error al conectar a la base de datos:", error);
	});
