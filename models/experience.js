"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PerformanceSchema = new Schema({
	id: Number,
	task: String,
});

const ExperienceSchema = new Schema({
	experience: {
		type: String,
		required: true,
	},
	enddate: {
		type: String,
	},
	description: {
		type: [PerformanceSchema],
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
	image: String,
});

module.exports = mongoose.model("Experience", ExperienceSchema);
