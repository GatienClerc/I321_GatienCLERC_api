# Projet FoodTruck API
## Documentation de la ressource Pizzas

### Auteur
Gatien Clerc

### Description du projet

Ce projet consiste à développer une API REST permettant la gestion d'une ressource **Pizza** dans le cadre du laboratoire FoodTruck. L'API permet d'effectuer les opérations CRUD (Create, Read, Update, Delete) sur les pizzas.

---

# Modèle Conceptuel de Données (MCD)

## Version finale du MCD

### Entité Pizza

| Attribut | Type | Description |
|-----------|-----------|-----------|
| id | Integer | Identifiant unique |
| name | String | Nom de la pizza |
| description | String | Description de la pizza |
| imageUrl | String | URL de l'image |
| price | Float | Prix de la pizza |

### Représentation simplifiée

```text
+------------------+
|      Pizza       |
+------------------+
| id               |
| name             |
| description      |
| imageUrl         |
| price            |
+------------------+
```