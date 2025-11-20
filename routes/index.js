const express = require("express");
const router = express.Router();

const artisteRoutes = require("./artist");

router.use("/artists", artisteRoutes);

module.exports = router;
