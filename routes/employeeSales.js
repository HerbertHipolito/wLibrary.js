const express = require('express');
const router = express.Router();
const {getSalesController,getRegisterSalesController,postRegisterSalesController} = require('../controllers/salesController');

router.get('/',getSalesController);

router.get('/register',getRegisterSalesController).post('/register',postRegisterSalesController);


module.exports = router;