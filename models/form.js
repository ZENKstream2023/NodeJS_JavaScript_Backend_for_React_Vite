"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FormSchema = new Schema({
	company: {
		type: String,
		required: true,
	},
	address: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
		// Utilizamos una expresión regular para validar el formato del correo electrónico
	},
	subject: {
		type: String,
	},
	description: {
		type: String,
	},
	typejob: {
		type: String,
		enum: ["Frontend", "Backend", "Fullstack"]
	}
});

module.exports = mongoose.model("Form", FormSchema);
