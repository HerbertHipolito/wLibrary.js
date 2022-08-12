const express = require('express');
const router = express.Router();
const {getRentController,postRentController} = require('../controllers/rentController');

router.get('/',getRentController).post('/',postRentController);

module.exports = router;