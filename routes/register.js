const express = require('express');
const router = express.Router();
const path = require('path');
const {getRegisterController,postRegisterController} = require('../controllers/registerControllers')


router.get('/',getRegisterController).post('/',postRegisterController);

module.exports = router;