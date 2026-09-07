// routes/router.js
const express = require('express');
const pizzaRouter = require('./pizza');

const router = express.Router();

router.use('/pizzas', pizzaRouter);

module.exports = router;
