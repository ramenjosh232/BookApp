module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cover: {
      type: DataTypes.STRING
    }
  });

  Book.associate = function(models) {
    Book.belongsTo(models.Category, {
      foreignKey: 'categoryId',
      as: 'Category'
    });
    Book.belongsTo(models.Author, {
      foreignKey: 'authorId',
      as: 'Author'
    });
    Book.belongsTo(models.Publisher, {
      foreignKey: 'publisherId',
      as: 'Publisher'
    });
  };

  return Book;
};
