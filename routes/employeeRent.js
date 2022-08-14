const express = require('express');
const router = express.Router();
const {getRentController,postRentController,getAllRentsController} = require('../controllers/rentController');

router.get('/',getRentController).post('/',postRentController);

router.get('/all',getAllRentsController);

module.exports = router;