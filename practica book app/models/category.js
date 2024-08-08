module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING
    }
  });

  Category.associate = function(models) {
   
    Category.hasMany(models.Book, {
      foreignKey: 'categoryId',
      as: 'Books'
    });
  };

  return Category;
};
