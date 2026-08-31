// routes/router.js
const express = require('express');
const productsRouter = require('./pizza');

const router = express.Router();

router.use('/products', productsRouter);

module.exports = router;
