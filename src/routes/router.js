// routes/router.js
const express = require('express');
const pizzaRouter = require('./pizza');
const ingredientRouter = require('./ingredient');
const carteRouter = require('./carte');

const router = express.Router();

router.use('/pizzas', pizzaRouter);
router.use('/ingredients', ingredientRouter);
router.use('/carte', carteRouter);

module.exports = router;
