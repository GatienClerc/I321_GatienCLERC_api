// entities/Pizza.js
const db = require('../config/database');

class Pizza {
    static create({ name, description, imageUrl, price }) {
        const sql = `INSERT INTO pizzas (name, description, imageUrl, price, created_at, updated_at)
                 VALUES (?, ?, ?, ?, datetime('now'), datetime('now'))`;
        const params = [name, description || null, imageUrl || null, price];

        return new Promise((resolve, reject) => {
            db.run(sql, params, function (err) {
                if (err) return reject(err);
                // fetch created row
                Pizza.findById(this.lastID).then(resolve).catch(reject);
            });
        });
    }

    static findAll() {
        const sql = `SELECT * FROM pizzas ORDER BY id DESC`;
        return new Promise((resolve, reject) => {
            db.all(sql, [], (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }

    static findById(id) {
        const sql = `SELECT * FROM pizzas WHERE id = ?`;
        return new Promise((resolve, reject) => {
            db.get(sql, [id], (err, row) => {
                if (err) return reject(err);
                resolve(row || null);
            });
        });
    }

    static update(id, { name, description, imageUrl, price }) {
        const initSql = `
            CREATE TABLE IF NOT EXISTS pizzas (
                                                  id INTEGER PRIMARY KEY AUTOINCREMENT,
                                                  name TEXT NOT NULL,
                                
                                                  imageUrl TEXT,
                                                  price REAL NOT NULL,
                                                  created_at TEXT DEFAULT (datetime('now')),
                                                  updated_at TEXT DEFAULT (datetime('now'))
            );

            CREATE TABLE IF NOT EXISTS ingredients (
                                                       id INTEGER PRIMARY KEY AUTOINCREMENT,
                                                       name TEXT NOT NULL,
                                                       price REAL NOT NULL,
                                                       created_at TEXT DEFAULT (datetime('now')),
                                                       updated_at TEXT DEFAULT (datetime('now'))
            );

            CREATE TABLE IF NOT EXISTS pizzas_has_ingredients (
                                                                  id INTEGER PRIMARY KEY AUTOINCREMENT,
                                                                  pizza_id INTEGER,
                                                                  ingredient_id INTEGER,
                                                                  FOREIGN KEY(pizza_id) REFERENCES pizzas(id) ON DELETE CASCADE,
                                                                  FOREIGN KEY(ingredient_id) REFERENCES ingredients(id) ON DELETE CASCADE,
                                                                  created_at TEXT DEFAULT (datetime('now')),
                                                                  updated_at TEXT DEFAULT (datetime('now'))
            );
        `;
    }
}

module.exports = Pizza;
