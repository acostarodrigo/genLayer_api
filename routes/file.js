/*
    Boonji contract routes
    host + /api/location
*/
const { Router } = require("express");

const { showError } = require("../middleware/showError");
const { verifyToken } = require("../middleware/verifyToken");
const { uploadFile } = require("../controllers/file/fileUploadController");

const router = Router();

router.post("/upload", [verifyToken, showError], uploadFile);

module.exports = router;
