"use strict";

var validator = require("validator");
var fs = require("fs");
var path = require("path");
var Experience = require("../models/experience");
const experience = require("../models/experience");
var controller = {
	datosCurso: (req, res) => {
		var Hola = req.body.Hola;
		return res.status(200).send({
			Portafolio: "Portafolio en Frameworks JS & Backend NodeJS",
			autor: "Aritz Robledo Jorge",
			correo: "webseobilbao@gmail.com",
			tel: "+34 634 412 771",
			Hola,
		});
	},

	test: (req, res) => {
		return res.status(200).send({
			message: "Soy la acción test de mi controlador de títulos",
		});
	},

	save: async (req, res) => {
		// Recoger parámetros por post
		var params = req.body;

		// Validar datos (validator)
		try {
			var validate_experience = !validator.isEmpty(params.experience);

			var validate_description =
				Array.isArray(params.description) && params.description.length > 0;
		} catch (err) {
			return res.status(400).send({
				status: "error",
				message: "Faltan datos por enviar",
			});
		}

		if (validate_experience && validate_description) {
			try {
				// Crear el objeto a guardar
				var experience = new Experience();

				// Asignar valores
				experience.experience = params.experience;
				experience.enddate = params.enddate;
				experience.description = params.description;
				experience.image = params.image;
				experience.typejob = params.typejob;

				// Guardar el artículo usando await
				const experienceStored = await experience.save();

				if (!experienceStored) {
					return res.status(500).send({
						status: "error",
						message: "El artículo no se ha guardado",
					});
				}

				// Devolver una respuesta
				return res.status(201).send({
					status: "success",
					experience: experienceStored,
				});
			} catch (error) {
				return res.status(500).send({
					status: "error",
					message: "Error al guardar el artículo" + error.message,
				});
			}
		} else {
			return res.status(400).send({
				status: "error",
				message: "Los datos no son válidos",
			});
		}
	},

	getExperiences: async (req, res) => {
		var query = Experience.find({});
		var last = req.params.last;
		if (last || last !== undefined) {
			query.limit(5);
		}

		try {
			// Buscar todos los artículos usando await
			const Titles = await query.sort("-_id").exec();

			if (!Titles || Titles.length === 0) {
				return res.status(404).send({
					status: "error",
					message: "No hay artículos para mostrar",
				});
			}

			return res.status(200).send({
				status: "success",
				Titles,
			});
		} catch (error) {
			return res.status(500).send({
				status: "error",
				message: "Error al devolver los artículos",
			});
		}
	},

	getAExperience: async (req, res) => {
		try {
			// Recoger el id de la URL
			var experienceId = req.params.id;

			// Comprobar que existe
			if (!experienceId || experienceId == null) {
				return res.status(404).send({
					status: "error",
					message: "No existe el artículo",
				});
			}

			// Buscar el artículo usando await
			const experience = await Experience.findById(experienceId).exec();

			if (!experience) {
				return res.status(404).send({
					status: "error",
					message: "No existe el artículo",
				});
			}

			// Devolverlo en JSON
			return res.status(200).send({
				status: "success",
				experience,
			});
		} catch (error) {
			return res.status(500).send({
				status: "error",
				message: "Error al devolver el artículo",
			});
		}
	},
	update: async (req, res) => {
		try {
			// Recoger el id del artículo por la URL
			var experienceId = req.params.id;

			// Recoger los datos que llegan por PUT
			var params = req.body;

			// Validar datos
			var validate_experience = !validator.isEmpty(params.experience);

			var validate_description =
				Array.isArray(params.description) && params.description.length > 0;

			if (validate_experience && validate_description) {
				// Find and update utilizando await
				const experienceUpdated = await Experience.findOneAndUpdate(
					{ _id: experienceId },
					params,
					{ new: true },
				).exec();

				if (!experienceUpdated) {
					return res.status(404).send({
						status: "error",
						message: "No existe el artículo",
					});
				}

				return res.status(200).send({
					status: "success",
					experience: experienceUpdated,
				});
			} else {
				// Devolver respuesta de error de validación
				return res.status(400).send({
					status: "error",
					message: "La validación no es correcta",
				});
			}
		} catch (error) {
			// Manejar errores internos del servidor
			return res.status(500).send({
				status: "error",
				message: "Error al actualizar el artículo",
			});
		}
	},
	delete: async (req, res) => {
		try {
			// Recoger el id del artículo por la URL
			var experienceId = req.params.id;

			// Buscar el artículo y eliminarlo usando await
			const experienceDeleted =
				await Experience.findByIdAndDelete(experienceId).exec();

			if (!experienceDeleted) {
				return res.status(404).send({
					status: "error",
					message: "No existe el artículo",
				});
			}

			return res.status(200).send({
				status: "success",
				message: "Artículo eliminado correctamente",
			});
		} catch (error) {
			// Manejar errores internos del servidor
			return res.status(500).send({
				status: "error",
				message: "Error al eliminar el artículo",
			});
		}
	},
	// Método para subir un archivo
	upload: async (req, res) => {
		// Recoger el fichero de la petición
		var file_name = "No se ha podido subir la imagen...";

		if (!req.files || !req.files.file0) {
			return res.status(404).send({
				status: "error",
				message: file_name,
			});
		}

		// Conseguir nombre y la extensión del archivo
		var file_path = req.files.file0.path;
		var file_split = file_path.split("\\");

		// * ADVERTENCIA * EN LINUX O MAC
		// var file_split = file_path.split('/');

		// Nombre del archivo
		var file_name = file_split[2];

		// Extensión del fichero
		var extension_split = file_name.split(".");
		var file_ext = extension_split[1];

		// Comprobar la extensión, solo imágenes, si no es válida, borrar el fichero
		if (
			file_ext != "png" &&
			file_ext != "jpg" &&
			file_ext != "jpeg" &&
			file_ext != "gif"
		) {
			// Borrar el archivo subido
			fs.unlink(file_path, (err) => {
				return res.status(404).send({
					status: "error",
					message: "La extensión de la imagen no es válida",
				});
			});
		} else {
			// Si todo es válido, obtener la ID de la URL
			var experienceId = req.params.id;

			// Buscar el artículo, asignarle el nombre de la imagen y actualizarlo
			Experience.findOneAndUpdate(
				{ _id: experienceId },
				{ image: file_name },
				{ new: true },
			)
				.then((experienceUpdated) => {
					if (!experienceUpdated) {
						return res.status(404).send({
							status: "error",
							message: "Error al guardar la imagen del artículo",
						});
					}
					return res.status(200).send({
						status: "success",
						experience: experienceUpdated,
					});
				})
				.catch((error) => {
					return res.status(500).send({
						status: "error",
						message: "Error al guardar la imagen del artículo",
					});
				});
		}
	},
	getImage: (req, res) => {
		var file = req.params.image;
		var path_file = "./uploads/Titles/" + file;
		fs.exists(path_file, (exists) => {
			if (exists) {
				return res.sendFile(path.resolve(path_file));
			} else {
				return res.status(404).send({
					status: "error",
					message: "La imagen no existe",
				});
			}
		});
	},
	search: async (req, res) => {
		try {
			// Obtener el string a buscar desde los parámetros de la URL
			const searchString = req.params.search;

			// Utilizar expresiones regulares para buscar en los campos 'experience' y 'description' de forma insensible a mayúsculas
			const Titles = await Experience.find({
				$or: [
					{ experience: { $regex: searchString, $options: "i" } },
					{ description: { $regex: searchString, $options: "i" } },
				],
			})
				.sort({ date: "descending" })
				.exec();

			if (Titles.length === 0 || !searchString.trim()) {
				return res.status(404).send({
					status: "error",
					message: "No se encontraron artículos que coincidan con la búsqueda",
				});
			}

			return res.status(200).send({
				status: "success",
				Titles,
			});
		} catch (error) {
			return res.status(500).send({
				status: "error",
				message: "Error en la petición",
			});
		}
	},
}; // end controller

module.exports = controller;
