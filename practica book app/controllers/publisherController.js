const { Publisher, Book, sequelize } = require('../models');

exports.listPublishers = async (req, res) => {
  try {
    const publishers = await Publisher.findAll({
      include: [
        { model: Book, as: 'Books', attributes: ['id'] }  
      ]
    });
    res.render('maintenance/publishers', { publishers });
  } catch (error) {
    console.error('Error fetching publishers:', error);
    res.status(500).send('Error fetching publishers');
  }
};

exports.createPublisherForm = (req, res) => {
  res.render('maintenance/publisherNew');
};

exports.createPublisher = async (req, res) => {
  try {
    const { name, phone, country } = req.body;
    await Publisher.create({ name, phone, country });
    res.redirect('/publishers');
  } catch (error) {
    console.error('Error creating publisher:', error);
    res.status(500).send('Error creating publisher');
  }
};

exports.editPublisherForm = async (req, res) => {
  try {
    const publisher = await Publisher.findByPk(req.params.id);
    res.render('maintenance/publisherEdit', { publisher });
  } catch (error) {
    console.error('Error fetching publisher for edit:', error);
    res.status(500).send('Error fetching publisher for edit');
  }
};

exports.editPublisher = async (req, res) => {
  try {
    const { name, phone, country } = req.body;
    await Publisher.update({ name, phone, country }, { where: { id: req.params.id } });
    res.redirect('/publishers');
  } catch (error) {
    console.error('Error updating publisher:', error);
    res.status(500).send('Error updating publisher');
  }
};

exports.deletePublisherForm = async (req, res) => {
    try {
      const publisher = await Publisher.findByPk(req.params.id, {
        include: [
          { model: Book, as: 'Books', attributes: ['id'] }
        ]
      });
      res.render('maintenance/publishersDelete', { publisher });
    } catch (error) {
      console.error('Error fetching publisher for delete:', error);
      res.status(500).send('Error fetching publisher for delete');
    }
  };
  
  exports.deletePublisher = async (req, res) => {
    try {
      await sequelize.transaction(async (t) => {
        await Book.destroy({ where: { publisherId: req.params.id }, transaction: t });
        await Publisher.destroy({ where: { id: req.params.id }, transaction: t });
      });
  
      res.redirect('/publishers');
    } catch (error) {
      console.error('Error deleting publisher:', error);
      res.status(500).send('Error deleting publisher');
    }
  };
