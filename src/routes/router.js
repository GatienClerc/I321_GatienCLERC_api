// routes/router.js
const express = require('express');
const pizzaRouter = require('./pizza');
const ingredientRouter = require('./ingredient');

const router = express.Router();

router.use('/pizzas', pizzaRouter);
router.use('/ingredients', ingredientRouter);

module.exports = router;
