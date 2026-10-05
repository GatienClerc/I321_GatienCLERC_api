// src/services/pizzaService.js
const PizzaEntity = require('../entities/Pizza');

const INGREDIENT_SERVICE_URL = process.env.INGREDIENT_SERVICE_URL || 'http://localhost:3000';

const PizzaService = {
    async getAll() {
        return PizzaEntity.findAll();
    },

    async getById(id) {
        return PizzaEntity.findById(id);
    },

    async getAllWithIngredients() {
        const pizzas = await PizzaEntity.findAll();

        return Promise.all(
            pizzas.map(async (pizza) => {
                const compositions = await PizzaEntity.findCompositions(pizza.id);

                const ingredients = await Promise.all(
                    compositions.map(async (comp) => {

                        const res = await fetch(`${INGREDIENT_SERVICE_URL}/api/ingredients/${comp.ingredient_id}`);

                        if (!res.ok) {
                            return null;
                        }
                        const ingredientData = await res.json();
                        return { ...ingredientData, quantity: comp.quantity, unit: comp.unit};
                    })
                );

                return { ...pizza, ingredients: ingredients.filter(Boolean)};

            })
        );
    },

    async getPizzaWithIngredients(pizzaId) {
        const pizza = await PizzaEntity.findById(pizzaId);
        if (!pizza) throw new Error('Pizza not found');

        const compositions = await PizzaEntity.findCompositions(pizzaId);

        const ingredients = await Promise.all(
            compositions.map(async (comp) => {
                const res = await fetch(`${INGREDIENT_SERVICE_URL}/api/ingredients/${comp.ingredient_id}`);
                if (!res.ok) throw new Error(`ingredients ${comp.ingredient_id} not found`);
                const ingredientData = await res.json();
                return { ...ingredientData, quantity: comp.quantity, unit: comp.unit };
            })
        );

        return { ...pizza, ingredients };
    },

    async getCompositions(pizzaId) {
        return PizzaEntity.findCompositions(pizzaId);
    }
};

module.exports = PizzaService;
