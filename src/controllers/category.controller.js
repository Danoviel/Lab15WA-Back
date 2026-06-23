const { Category } = require('../models');

// GET /api/categories  (público)
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({ order: [['nombre', 'ASC']] });
    res.json({
      success: true,
      message: 'Categorías obtenidas correctamente',
      data: categories
    });
  } catch (error) {
    console.error('Error al obtener categorías:', error);
    res.status(500).json({ success: false, message: 'Error al obtener categorías', data: null });
  }
};

// POST /api/categories  (solo ADMIN)
exports.createCategory = async (req, res) => {
  try {
    const { nombre } = req.body;

    if (!nombre) {
      return res.status(400).json({ success: false, message: 'El nombre es requerido', data: null });
    }

    const exists = await Category.findOne({ where: { nombre } });
    if (exists) {
      return res.status(409).json({ success: false, message: 'La categoría ya existe', data: null });
    }

    const category = await Category.create({ nombre });
    res.status(201).json({
      success: true,
      message: 'Categoría creada correctamente',
      data: category
    });
  } catch (error) {
    console.error('Error al crear categoría:', error);
    res.status(500).json({ success: false, message: 'Error al crear categoría', data: null });
  }
};
