/***********************************************************************************************************************
 * Program name :           data_insert.sql
 * Description :            Application principale
 * Author :                 Gatien Clerc
 * Creation date :          04.09.26
 * Modified by :            -
 * Modification date :      -
 * Version :                0.1
 **********************************************************************************************************************/

USE `dev`;


-- -----------------------------------------------------
-- pizzas
-- -----------------------------------------------------
INSERT INTO pizzas (name, imageUrl, price) VALUES
                                                           ('Pizza du moment', 'https://picsum.photos/200?1', 20),
                                                           ('Margherita', null , 12),
                                                           ('4 Saisons', null, 17);

-- -----------------------------------------------------
-- ingredients
-- -----------------------------------------------------
INSERT INTO ingredients (name, price) VALUES
                                                            ('Mozzarella', 2),
                                                            ('Jambon', 2),
                                                            ('Champignons frais', 1),
                                                            ('Poivrons', 1),
                                                            ('Artichauts', 2),
                                                            ('Sauce tomate', 1),
                                                            ('Bresaola', 3),
                                                            ('Parmesan', 2),
                                                            ('Rucola', 1),
                                                            ('Tomates cerises', 1);


-- -----------------------------------------------------
-- pizzas_has_ingredients
-- -----------------------------------------------------
INSERT INTO pizzas_has_ingredients (pizza_id, ingredient_id) VALUES
                                                                    -- Pizza du moment (id 1)
                                                                    (1, 2), -- Bresaola
                                                                    (1, 7), -- Parmesan
                                                                    (1, 8), -- Rucola
                                                                    (1, 9), -- Tomates cerises
                                                                    (1, 1), -- Mozzarella

                                                                    -- Margherita (id 2)
                                                                    (2, 1), -- Mozzarella

                                                                    -- 4 Saisons (id 3)
                                                                    (3, 2), -- Jambon
                                                                    (3, 3), -- Champignons
                                                                    (3, 4), -- Poivrons
                                                                    (3, 5), -- Artichauts
                                                                    (3, 1); -- Mozzarella
