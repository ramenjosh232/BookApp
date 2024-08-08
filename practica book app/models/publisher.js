module.exports = (sequelize, DataTypes) => {
  const Publisher = sequelize.define('Publisher', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING
    },
    country: {
      type: DataTypes.STRING
    }
  });

  Publisher.associate = function(models) {
    Publisher.hasMany(models.Book, {
      foreignKey: 'publisherId',
      as: 'Books'
    });
  };

  return Publisher;
};
