const sequelize = require('../config/database');
const Product = require('./Product');
const Category = require('./Category');
const User = require('./User');

// Relaciones
Category.hasMany(Product, { foreignKey: 'categoryId', as: 'products' });
Product.belongsTo(Category, { foreignKey: 'categoryId', as: 'categoria' });

module.exports = { sequelize, Product, Category, User };
