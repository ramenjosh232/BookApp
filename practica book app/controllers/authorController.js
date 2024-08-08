const { Author, Book, sequelize } = require('../models');


exports.listAuthors = async (req, res) => {
  try {
    const authors = await Author.findAll({
      include: [
        { model: Book, as: 'Books', attributes: ['id'] }  
      ]
    });
    res.render('maintenance/authors', { authors });
  } catch (error) {
    console.error('Error fetching authors:', error);
    res.status(500).send('Error fetching authors');
  }
};

exports.createAuthorForm = (req, res) => {
  res.render('maintenance/authorNew');
};

exports.createAuthor = async (req, res) => {
  try {
    const { name, email } = req.body;
    await Author.create({ name, email });
    res.redirect('/authors');
  } catch (error) {
    console.error('Error creating author:', error);
    res.status(500).send('Error creating author');
  }
};

exports.editAuthorForm = async (req, res) => {
  try {
    const author = await Author.findByPk(req.params.id);
    res.render('maintenance/authorEdit', { author });
  } catch (error) {
    console.error('Error fetching author for edit:', error);
    res.status(500).send('Error fetching author for edit');
  }
};

exports.editAuthor = async (req, res) => {
  try {
    const { name, email } = req.body;
    await Author.update({ name, email }, { where: { id: req.params.id } });
    res.redirect('/authors');
  } catch (error) {
    console.error('Error updating author:', error);
    res.status(500).send('Error updating author');
  }
};

exports.deleteAuthor = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
      const authorId = req.params.id;
      await Book.destroy({ where: { authorId }, transaction });
      await Author.destroy({ where: { id: authorId }, transaction });
      await transaction.commit();
      res.redirect('/authors');
    } catch (error) {
      await transaction.rollback();
      console.error('Error deleting author:', error);
      res.status(500).send('Error deleting author');
    }
  };

  exports.deleteAuthorForm = async (req, res) => {
    try {
      const author = await Author.findByPk(req.params.id, {
        include: [
          { model: Book, as: 'Books', attributes: ['id'] }
        ]
      });
      res.render('maintenance/authorsDelete', { author });
    } catch (error) {
      console.error('Error fetching author for delete:', error);
      res.status(500).send('Error fetching author for delete');
    }
  };