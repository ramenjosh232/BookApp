const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { sequelize } = require('./models');

dotenv.config();

const homeController = require('./controllers/homeController');
const bookRoutes = require('./routes/books');
const categoryRoutes = require('./routes/categories');
const authorRoutes = require('./routes/authors');
const publisherRoutes = require('./routes/publishers');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.static(path.join(__dirname,'public')));


app.get('/', homeController.home);
app.use('/books', bookRoutes);
app.use('/categories', categoryRoutes);
app.use('/authors', authorRoutes);
app.use('/publishers', publisherRoutes);


sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
});
