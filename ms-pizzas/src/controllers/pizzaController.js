const PizzaService = require('../services/pizzaService');

const PizzaController = {
    // GET /api/pizzas
    async findAll(req, res) {
        try {
            const pizzas = await PizzaService.getAll();
            res.json(pizzas);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // GET /api/pizzas/:id
    async findOne(req, res) {
        try {
            const pizzas = await PizzaService.getById(req.params.id);
            if (!pizzas) return res.status(404).json({ error: 'Pizza not found' });
            res.json(pizzas);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // GET /api/pizzas/full
    async findAllWithItems(req, res) {
        try {
            const pizzas = await PizzaService.getAllWithItems();
            res.json(pizzas);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // GET /api/pizzas/:id/full
    // Returns pizza + list of items
    async getPizzaWithItems(req, res) {
        try {
            const { id } = req.params;
            const pizza = await PizzaService.getPizzaWithItems(id);
            res.json(pizza);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    },


    // GET /api/pizzas/:id/compositions
    async getCompositions(req, res) {
        try {
            const { id } = req.params;
            const compositions = await PizzaService.getCompositions(id);
            res.json(compositions);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

};

module.exports = PizzaController;
