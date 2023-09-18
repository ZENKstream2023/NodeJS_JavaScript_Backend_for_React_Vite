"use strict";

const express = require("express");
const FormController = require("../controllers/form");

const router = express.Router();

// Rutas de prueba
router.post("/probando", FormController.datosCurso);
router.get("/test-de-controlador", FormController.test);

// Rutas útiles
router.post("/save-forms", FormController.save);
router.get("/forms/:last?", FormController.getForms);
router.get("/form/:id", FormController.getAForm);
router.put("/form/:id", FormController.update);
router.delete("/form/:id", FormController.delete);
router.get("/search-forms/:search", FormController.search);

module.exports = router;
