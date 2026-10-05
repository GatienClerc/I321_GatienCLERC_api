// routes/pizzas.js
const express = require('express');
const { body, param } = require('express-validator');
const pizzaController = require('../controllers/pizzaController');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     PizzaComposition:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         pizza_id:
 *           type: integer
 *           example: 1
 *         item_id:
 *           type: integer
 *           example: 2
 */

/**
 * @openapi
 * /pizzas:
 *   get:
 *     summary: Retrieve a list of pizzas
 *     responses:
 *       200:
 *         description: A list of pizza
 *   post:
 *     summary: Create a new pizza
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       201:
 *         description: Pizza item
 *       400:
 *         description: Invalid input
 */

/**
 * @openapi
 * /pizzas/{id}:
 *   get:
 *     summary: Get a pizza by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single pizza
 *       404:
 *         description: Pizza not found
 *   put:
 *     summary: Update a pizza by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       200:
 *         description: Pizza updated
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Pizza not found
 *   delete:
 *     summary: Delete a pizza by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Pizza deleted
 *       404:
 *         description: Pizza not found
 */

/**
 * @openapi
 * /pizzas/{id}/compositions:
 *   get:
 *     summary: Get all composition items for a pizza
 *     tags: [Compositions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Pizza ID
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       '200':
 *         description: Array of pizza compositions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PizzaComposition'
 *       '404':
 *         description: Pizza not found
 *
 *   post:
 *     summary: Add a composition item to a pizza
 *     tags: [Compositions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the pizza to which the composition is added
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               item_id:
 *                 type: integer
 *                 description: The ID of the pizza item to associate
 *                 example: 2
 *     responses:
 *       201:
 *         description: Composition successfully added
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PizzaComposition'
 *       400:
 *         description: Validation error or missing data
 *       404:
 *         description: Pizza or item not found
 *
 *
 *   delete:
 *     summary: Delete all composition items for a specific pizza
 *     tags: [Compositions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the pizza whose compositions should be deleted
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       204:
 *         description: All compositions successfully deleted
 *       404:
 *         description: Pizza or composition not found
 */

/**
 * Validation rules
 */
const createAndUpdateValidationsPizza = [
    body('name').isString().notEmpty().withMessage('name is required'),
    body('price').isFloat({ gt: 0 }).withMessage('price must be a positive number'),
];

const createAndUpdateValidationsCompositions = [
    body('product_id').isString().notEmpty().withMessage('pizza id is required'),
    body('item_id').isString().notEmpty().withMessage('item id is required'),
];

// ---------------- Pizza ----------------
router.get('/', pizzaController.findAll);
router.get('/:id/full', [param('id').isInt()], pizzaController.getPizzaWithIngredients);
router.get('/full', pizzaController.findAllWithIngredients);

// ---------------- Composition ----------------
router.get('/:id/compositions',[param('id').isInt()], pizzaController.getCompositions);

module.exports = router;
