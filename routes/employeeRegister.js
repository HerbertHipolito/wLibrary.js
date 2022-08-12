const express = require('express');
const router = express.Router();
const {getRegisterController,postRegisterController} = require('../controllers/emplRegisterController');

router.get('/',getRegisterController).post('/',postRegisterController);

module.exports = router;