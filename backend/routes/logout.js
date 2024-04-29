const express = require('express');
const router = express.Router();
const logoutController = require('../controllers/userController');

router.get('/', logoutController.logoutUser);

module.exports = router;