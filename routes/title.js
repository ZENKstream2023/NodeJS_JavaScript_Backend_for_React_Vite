"use strict";

const express = require("express");
const TitleController = require("../controllers/title");

const router = express.Router();

const multiparty = require("connect-multiparty");
const md_upload = multiparty({ uploadDir: "./uploads/title" });

// Rutas de prueba
router.post("/probando", TitleController.datosCurso);
router.get("/test-de-controlador", TitleController.test);

// Rutas útiles
router.post("/save", TitleController.save);
router.get("/titulaciones/:last?", TitleController.getTitles);
router.get("/titulo/:id", TitleController.getAtitle);
router.put("/titulo/:id", TitleController.update);
router.delete("/titulo/:id", TitleController.delete);
router.post("/upload-image/:id", md_upload, TitleController.upload);
router.get("/get-image/:image", TitleController.getImage);
router.get("/search/:search", TitleController.search);

module.exports = router;
