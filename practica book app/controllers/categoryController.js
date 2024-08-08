const { Category, Book, sequelize } = require('../models');

exports.listCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [
        { model: Book, as: 'Books', attributes: ['id'] }  
      ]
    });
    res.render('maintenance/categories', { categories });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).send('Error fetching categories');
  }
};

exports.createCategoryForm = (req, res) => {
  res.render('maintenance/categoryNew');
};

exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    await Category.create({ name, description });
    res.redirect('/categories');
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).send('Error creating category');
  }
};

exports.editCategoryForm = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    res.render('maintenance/categoryEdit', { category });
  } catch (error) {
    console.error('Error fetching category for edit:', error);
    res.status(500).send('Error fetching category for edit');
  }
};

exports.editCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    await Category.update({ name, description }, { where: { id: req.params.id } });
    res.redirect('/categories');
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).send('Error updating category');
  }
};

exports.deleteCategoryForm = async (req, res) => {
    try {
      const category = await Category.findByPk(req.params.id, {
        include: [
          { model: Book, as: 'Books', attributes: ['id'] }
        ]
      });
      res.render('maintenance/categoriesDelete', { category });
    } catch (error) {
      console.error('Error fetching category for delete:', error);
      res.status(500).send('Error fetching category for delete');
    }
  };
  
  exports.deleteCategory = async (req, res) => {
    try {
      await sequelize.transaction(async (t) => {
        await Book.destroy({ where: { categoryId: req.params.id }, transaction: t });
        await Category.destroy({ where: { id: req.params.id }, transaction: t });
      });
  
      res.redirect('/categories');
    } catch (error) {
      console.error('Error deleting category:', error);
      res.status(500).send('Error deleting category');
    }
  };
  
