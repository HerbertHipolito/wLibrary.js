const express = require('express');
const router = express.Router();
const {getEmplLoginController,postEmplLoginController,} = require('../controllers/emplLoginController');

router.get('/',getEmplLoginController).post('/',postEmplLoginController);

module.exports = router;
