"use strict";

const express = require("express");
const ExperienceController = require("../controllers/experience");

const router = express.Router();

const multiparty = require("connect-multiparty");
const md_upload = multiparty({ uploadDir: "./uploads/experience" });

// Rutas de prueba
router.post("/probando", ExperienceController.datosCurso);
router.get("/test-de-controlador", ExperienceController.test);

// Rutas útiles
router.post("/save-experience", ExperienceController.save);
router.get("/experiences/:last?", ExperienceController.getExperiences);
router.get("/experience/:id", ExperienceController.getAExperience);
router.put("/experience/:id", ExperienceController.update);
router.delete("/experience/:id", ExperienceController.delete);
router.post(
	"/upload-experience-image/:id",
	md_upload,
	ExperienceController.upload,
);
router.get("/get-experience-image/:image", ExperienceController.getImage);
router.get("/search-experience/:search", ExperienceController.search);

module.exports = router;
