const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '../database.sqlite')
});

const db = {};

// Importar los modelos
db.Book = require('./book')(sequelize, DataTypes);
db.Category = require('./category')(sequelize, DataTypes);
db.Author = require('./author')(sequelize, DataTypes);
db.Publisher = require('./publisher')(sequelize, DataTypes);

// Configurar asociaciones
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
