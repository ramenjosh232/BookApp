const { Book, Category, Author, Publisher } = require('../models');
const { Op } = require('sequelize');

exports.home = async (req, res) => {
  const { title, categories } = req.query;
  const where = {};

  if (title) {
    where.title = { [Op.like]: `%${title}%` };
  }

  if (categories) {
 
    const categoryArray = Array.isArray(categories) ? categories : [categories];
    where.categoryId = {
      [Op.in]: categoryArray
    };
  }

  try {
    const books = await Book.findAll({
      where,
      include: [
        { model: Category, as: 'Category' },
        { model: Author, as: 'Author' },
        { model: Publisher, as: 'Publisher' }
      ]
    });

    const categoriesList = await Category.findAll();

    res.render('home', { books, categories: categoriesList, title, selectedCategories: Array.isArray(categories) ? categories : [categories] });
  } catch (error) {
    console.error('Error fetching books or categories:', error);
    res.status(500).send('Error fetching data');
  }
};
