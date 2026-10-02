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

    async getAllWithItems() {
        const pizzas = await PizzaEntity.findAll();

        return Promise.all(
            pizzas.map(async (pizza) => {
                const compositions = await PizzaEntity.findCompositions(pizza.id);

                const items = await Promise.all(
                    compositions.map(async (comp) => {

                        const res = await fetch(`${INGREDIENT_SERVICE_URL}/api/ingredients/${comp.item_id}`);

                        if (!res.ok) {
                            return null;
                        }
                        const itemData = await res.json();
                        return { ...itemData, quantity: comp.quantity, unit: comp.unit};
                    })
                );

                return { ...pizza, items: items.filter(Boolean)};
            })
        );
    },

    async getPizzaWithItems(pizzaId) {
        const pizza = await PizzaEntity.findById(pizzaId);
        if (!pizza) throw new Error('Pizza not found');

        const compositions = await PizzaEntity.findCompositions(pizzaId);

        const items = await Promise.all(
            compositions.map(async (comp) => {
                const res = await fetch(`${INGREDIENT_SERVICE_URL}/api/ingredients/${comp.item_id}`);
                if (!res.ok) throw new Error(`ingredients ${comp.item_id} not found`);
                const itemData = await res.json();
                return { ...itemData, quantity: comp.quantity, unit: comp.unit };
            })
        );

        return { ...pizza, items };
    },

    async getCompositions(pizzaId) {
        return PizzaEntity.findCompositions(pizzaId);
    }
};

module.exports = PizzaService;
