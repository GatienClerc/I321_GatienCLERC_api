// entities/PHI.js
const db = require('../config/database');

class PHI {
    static findAll() {
        const sql = `SELECT * FROM pizzas_has_ingredients phi ORDER BY id DESC`;
        return new Promise((resolve, reject) => {
            db.all(sql, [], (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }

    static findById(id) {
        const sql = ` SELECT * FROM pizzas_has_ingredients phi WHERE id = ? `;

        return new Promise((resolve, reject) => {
            db.get(sql, [id], (err, row) => {
                if (err) return reject(err);
                resolve(row || null);
            });
        });
    }
}

module.exports = PHI;
