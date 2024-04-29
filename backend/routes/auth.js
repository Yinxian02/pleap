const express = require('express');
const router = express.Router();
const authController = require('../controllers/userController');

router.post('/', authController.loginUser);

module.exports = router;