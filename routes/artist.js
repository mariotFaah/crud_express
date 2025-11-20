const express = require('express');
const router = express.Router();

const artistController = require('../controllers/artist');

router.get("/", artistController.list);
router.get("/:id", artistController.read);
router.post("/", artistController.create);
router.put("/:id", artistController.update);
router.delete("/:id", artistController.remove);


module.exports = router;
