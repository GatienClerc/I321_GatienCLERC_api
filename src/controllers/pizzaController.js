// controllers/pizzaController.js
const { validationResult } = require('express-validator');
const Pizza = require('../entities/Pizza');

/**
 * Controller functions use Express (req, res) signatures and
 * respond with status codes matching MDN/HTTP recommendations.
 */

exports.findAll = async (req, res, next) => {
    try {
        const pizza = await Pizza.findAll();
        // 200 OK
        return res.status(200).json(pizza);
    } catch (err) {
        next(err);
    }
};

exports.findOne = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid pizza id' });

        const pizza = await Pizza.findById(id);
        if (!pizza) return res.status(404).json({ error: 'Pizza not found' }); // 404 Not Found

        return res.status(200).json(pizza);
    } catch (err) {
        next(err);
    }
};
