const express = require('express');
const router = express.Router();
const path = require('path');
const {rootController,searchBookController} = require('../controllers/rootController');

router.get('/',rootController).post('/resultSearch',searchBookController);

module.exports = router;
