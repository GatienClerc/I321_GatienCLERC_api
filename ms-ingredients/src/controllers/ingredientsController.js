// controllers/ingredientsController.js
const { validationResult } = require('express-validator');
const Ingredients = require('../entities/Ingredients');

/**
 * Controller functions use Express (req, res) signatures and
 * respond with status codes matching MDN/HTTP recommendations.
 */

exports.findAll = async (req, res, next) => {
    try {
        const ingredients = await Ingredients.findAll();
        // 200 OK
        return res.status(200).json(ingredients);
    } catch (err) {
        next(err);
    }
};

exports.findOne = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid ingredient item id' });

        const ingredients = await Ingredients.findById(id);
        if (!ingredients) return res.status(404).json({ error: 'Ingredient item not found' }); // 404 Not Found

        return res.status(200).json(ingredients);
    } catch (err) {
        next(err);
    }
};