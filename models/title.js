"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TitleSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	enddate: {
		type: String,
	},
	description: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
	image: String,
});

module.exports = mongoose.model("Title", TitleSchema);
