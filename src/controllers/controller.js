// controllers/controller.js
const { validationResult } = require('express-validator');
const Pizza = require('../entities/Pizza');
const Ingredient = require('../entities/Ingredient');
const phi = require('../entities/PHI');

/**
 * Controller functions use Express (req, res) signatures and
 * respond with status codes matching MDN/HTTP recommendations.
 */

exports.findAll = async (req, res, next) => {
    try {

        const pizzas = await Pizza.findAll();
        const relations = await phi.findAll();

        for (const pizza of pizzas) {

            pizza.ingredients = [];

            for (const relation of relations) {

                if (relation.pizza_id === pizza.id) {

                    const ingredient = await Ingredient.findById(
                        relation.ingredient_id
                    );

                    if (ingredient) {
                        pizza.ingredients.push(ingredient);
                    }
                }
            }
        }

        return res.status(200).json(pizzas);

    } catch (err) {
        next(err);
    }
};

exports.findById = async (req, res, next) => {
    try {
        const id = Number(req.params.id);

        if (Number.isNaN(id)) {
            return res.status(400).json({
                error: 'Invalid pizza id'
            });
        }

        const pizza = await Pizza.findById(id);

        if (!pizza) {
            return res.status(404).json({
                error: 'Pizza not found'
            });
        }

        const relations = await phi.findAll();

        const ingredients = [];

        for (const relation of relations) {

            if (relation.pizza_id === pizza.id) {

                const ingredient = await Ingredient.findById(
                    relation.ingredient_id
                );

                if (ingredient) {
                    ingredients.push(ingredient);
                }
            }
        }

        pizza.ingredients = ingredients;

        return res.status(200).json(pizza);

    } catch (err) {
        next(err);
    }
};