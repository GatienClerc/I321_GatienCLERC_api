// src/entities/Pizza.js
const db = require('../config/database');

const Pizza = {
    findAll() {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM pizzas', (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    },

    findById(id) {
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM pizzas WHERE id = ?', [id], (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });
    },

    findCompositions(pizzaId) {
        return new Promise((resolve, reject) => {
            db.all(
                'SELECT * FROM pizza_compositions WHERE pizza_id = ?',
                [pizzaId],
                (err, rows) => {
                    if (err) reject(err);
                    else resolve(rows);
                }
            );
        });
    },


}

module.exports = Pizza;
